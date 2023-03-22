'use client'
import React from 'react'

export type Data = { [title:string] : number[] }

const Table: React.FC<{header?: any, body?:Data, results?:any}> = ({ header, body, results }) => {

  return (
    <table className="table-auto">
        {
            header && 
        <thead>
            <tr>
                <th></th>
            {
            Object.values(header).map((title, index)=> {
                return (
                    <th key={index}>{`${title}`}</th>
                )
            })
            }
            </tr>
        </thead>
        }
        <tbody>
        {
            body &&
        Object.keys(body).map((title, index)=>{
        return (
            <tr key={index}>
                    <td className="py-1 font-medium">{title}</td>
                {body[title].map((num:any, index:any)=>{
                    return <td key={index} className="py-1 border">{num}</td>
                })}
            </tr>
        )
        })   
        }
        {
            results && 
            <tr>
                <td className="py-2 font-medium">Total</td>
            {
            Object.values(results).map((result, index)=> {
                return (
                    <td key={index}>{`${result}`}</td>
                )
            })
            }
            </tr>
        }
        </tbody>
    </table>
  )
}

export default Table

// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function BasicTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }