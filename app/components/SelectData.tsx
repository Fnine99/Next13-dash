import React, {} from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "./ui/Accordion"

const SelectData: React.FC<any> = ({}) => {
  return (
    <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
        Yes. It comes with default styles that matches the other components
        aesthetic.
        </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
        Yes. Its animated by default, but you can disable it if you prefer.
        </AccordionContent>
    </AccordionItem>
    </Accordion>
  )
}

export default SelectData