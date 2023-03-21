import sys
import json
import pandas as pd

class DCF:
    def __init__(self, data, forecast_period, discount_rate=0.0, perpertual_gr=0.0, capex_gr=0.01, DnA_gr=0.01, cwc_gr=0.03 ) -> None:
        self.data=data
        
        # mutable variables
        self.forecast_period=forecast_period
        self.discount_rate=discount_rate
        self.perpetual_growth_rate=perpertual_gr
        self.capex_growth_rate=capex_gr
        self.DnA_growth_rate=DnA_gr
        self.cwc_growth_rate=cwc_gr
        
        # computed variables
        self.forecasts_table:dict[str, list[float]]= {}
        self.ulFCF_forecast:list=None
        self.perpetual_growth_enterprise_value=None
        self.ev_to_ebitda_enterprise_value=None
        self.average_enterprise_value=None
        self.market_enterprise_value=None
        self.market_price=None
        self.ulFCF_forecast_NPV:list=None
        self.intrinsic_equity_value=None
        self.intrinsic_price=None

        self.tot_capitalization=data["profile"][0]["mktCap"]
        self.price=data["profile"][0]["price"]
        self.symbol=data["profile"][0]["symbol"]
        self.name= data["profile"][0]["companyName"]
        self.shares_outstanding= self.tot_capitalization/self.price
        self.tot_debt= data["balance_sheet"][0]["totalDebt"]
        self.tot_equity= data["balance_sheet"][0]["totalEquity"]
        self.beta= float(data["profile"][0]["beta"])
        self.int_expense= data["income_statement"][0]["interestExpense"]
        self.cash:int= data["balance_sheet"][0]["cashAndCashEquivalents"]

        self.ebitda=self.data["income_statement"][0]["ebitda"]
        self.dep_am=self.data["income_statement"][0]["depreciationAndAmortization"]
        self.ebit=self.ebitda-self.dep_am
        self.capex=self.data["cash_flow"][0]["capitalExpenditure"]
        self.cwc=self.data["cash_flow"][0]["changeInWorkingCapital"]

        self.eff_tax_rate=self.data["income_statement"][0]["incomeTaxExpense"]/self.data["income_statement"][0]["incomeBeforeTax"]
        self.risk_free_rate=0.05
        # data["risk_free"][0]["month3"]
        self.equity_risk_premium=0.07
        # self.beta*(data["risk_free"][0]["year10"]-0.08)

    def cpt_cost_of_equity(self) -> float:
        return 0.0
    
    def cpt_cost_of_debt(self) -> float:
        return 0.0

    def est_wacc_discount_rate(self) -> None:
        cost_of_equity = self.risk_free_rate+self.equity_risk_premium*self.beta
        cost_of_debt = self.int_expense/self.tot_debt
        after_tax_cost_of_debt = cost_of_debt*(1-self.eff_tax_rate)
        debt_to_cap = self.tot_debt/(self.tot_debt+self.tot_equity)
        equity_to_cap = self.tot_equity/(self.tot_debt+self.tot_equity)
        self.discount_rate = round(((after_tax_cost_of_debt*debt_to_cap)+(cost_of_equity*equity_to_cap)), 4)
        if self.discount_rate<=self.perpetual_growth_rate: self.discount_rate=0.1 ##
        
    def est_perpetual_growth_rate(self) -> float:
        """ https://www.investopedia.com/articles/active-trading/022315/stock-analysis-forecasting-revenue-and-growth.asp
        """
        return 0.03
    
    def est_capex_growth_rate(self) -> float:
        return 0.02 
   
    def est_DnA_growth_rate(self) -> float:
        return 0.02
    
    def est_cwc_growth_rate(self) -> float:
        return 0.02
    
    def cpt_ulFCF_forecast(self) -> None:
        self.forecasts_table["EBITDA"]=[self.ebitda*((1+self.perpetual_growth_rate)**t)/100000 for t in range(self.forecast_period)]
        self.forecasts_table["Taxes"]=[e*(self.eff_tax_rate)/100000 for e in self.forecasts_table["EBITDA"]]
        self.forecasts_table["D&A"]=[self.dep_am*((1+self.DnA_growth_rate)**t)/100000 for t in range(self.forecast_period)]
        self.forecasts_table["Capex"]=[self.capex*((1+self.capex_growth_rate)**t)/100000 for t in range(self.forecast_period)]
        self.forecasts_table["Change in WC"]=[self.cwc*((1+self.cwc_growth_rate)**t)/100000 for t in range(self.forecast_period)]
        def cpt_ulFCF(ebit, taxes, DnA, capex, cwc) -> float:
            return ebit-taxes+DnA-capex-cwc
        self.ulFCF_forecast=list(map(cpt_ulFCF, self.forecasts_table["EBITDA"], self.forecasts_table["Taxes"], self.forecasts_table["D&A"], self.forecasts_table["Capex"], self.forecasts_table["Change in WC"]))
        

    def cpt_terminal_value(self) -> tuple:
        self.perpetual_growth_enterprise_value=(
            (self.ulFCF_forecast[-1]*(1+self.perpetual_growth_rate))/
            (self.discount_rate-self.perpetual_growth_rate)
        )
        # print("perp. ev: ", self.perpetual_growth_enterprise_value)
        ev_to_ebitda_multiple=self.market_enterprise_value/(self.data["income_statement"][0]["ebitda"])
        self.ev_to_ebitda_enterprise_value=ev_to_ebitda_multiple*(self.forecasts_table["EBITDA"][-1]+self.forecasts_table["D&A"][-1])
        self.average_enterprise_value=(self.perpetual_growth_enterprise_value+self.ev_to_ebitda_enterprise_value)/2  ##
        self.ulFCF_forecast.append(self.average_enterprise_value) ##
        
        # return self.perpetual_growth_enterprise_value, self.ev_to_ebitda_enterprise_value, self.average_enterprise_value

    def cpt_market_value(self) -> tuple:
        self.market_enterprise_value=self.tot_capitalization+self.tot_debt-self.cash
        self.market_price=self.tot_capitalization/self.shares_outstanding  # equity value(market cap)/nShares outstanding
        # return self.market_enterprise_value, self.market_price

    def cpt_intrinsic_value(self) -> tuple:
        self.ulFCF_forecast_NPV=[fcf/((1+self.discount_rate)**(t+1)) for t, fcf in enumerate(self.ulFCF_forecast)]
        self.intrinsic_equity_value=sum(self.ulFCF_forecast_NPV)+self.cash-self.tot_debt
        self.intrinsic_price=self.intrinsic_equity_value/self.shares_outstanding
        # return self.intrinsic_equity_value, self.intrinsic_price
    
    def compute_dcf_model(self) -> None: 
        self.est_wacc_discount_rate()
        self.cpt_ulFCF_forecast()
        self.cpt_market_value()
        self.cpt_terminal_value()
        self.cpt_intrinsic_value()

    def summary(self) -> dict:
        return {
            "Security":f"{self.symbol}, {self.name}",
            "Current price":f"$ {self.price}",
            "Target price":f"$ {round((self.intrinsic_price),2)}",
            "Upside":f"$ {round((self.intrinsic_price-self.market_price),2)}",
            "Target price Upside": f"{round(((self.intrinsic_price/self.market_price)-1)*100, 2)}%",
            # "Internal Rate of return": 0,
            "Terminal value": int(self.intrinsic_equity_value)/100000   
        }
    
    def assumptions(self) -> dict:
        return {
            "Wacc used": f"{round((self.discount_rate)*100, 2)}%",
            "Risk-free rate used": f"{round((self.risk_free_rate)*100, 2)}%",
            "Perpetual growth rate used":f"{round((self.perpetual_growth_rate)*100, 2)}%",
            "Tax rate": f"{round((self.eff_tax_rate)*100, 2)}%",
            "Equity risk premium": f"{round((self.equity_risk_premium)*100, 2)}%",
            "Forcast period": int(self.forecast_period),
        }

if __name__ == '__main__':
    def my_function(json_data):
        data = json.loads(json_data)
        return data
        # print('Received data: ', data)

    args = sys.argv[1:]
    data = my_function(*args)
    model=DCF(data, 5)
    model.compute_dcf_model()
    assumptions = model.assumptions()
    summary = model.summary()
    # df = pd.DataFrame(model.forecasts_table.values(),
    #                 index=model.forecasts_table.keys(),
    #                 columns=list(pd.date_range(start="2023", periods=5, freq="Y"))
    #                 )
    
    sys.stdout.write(json.dumps({
        'assumptions':assumptions, 
        'summary':summary, 
        'forerasts_table':model.forecasts_table,
        'forerasts_table_results': model.ulFCF_forecast
    }))
    sys.stdout.flush()


    