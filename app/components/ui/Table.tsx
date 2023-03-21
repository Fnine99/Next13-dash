'use client'

import { createTheme, ThemeProvider } from '@mui/material'
import { DataGrid, GridColDef, GridColumnHeaderParams } from '@mui/x-data-grid'
// import { ApiRequest } from '@prisma/client'
import { useTheme } from 'next-themes'
import { FC } from 'react'

// type ModifiedRequestType<K extends keyof ApiRequest> = Omit<ApiRequest, K> & {
//   timestamp: string
// }

// interface TableProps {
//   userRequests: ModifiedRequestType<'timestamp'>[]
// }

export type Data = { [title:string] : number[] }

const columnsDraft: GridColDef[] = [
  {
    field: 'col1',
    headerName: 'API key used',
    width: 400,
    renderHeader(params) {
      return (
        <strong className='font-semibold'>{params.colDef.headerName} 🔑</strong>
      )
    },
  },
  { field: 'col2', headerName: 'Path', width: 250 },
  { field: 'col3', headerName: 'Recency', width: 250 },
  { field: 'col4', headerName: 'Duration', width: 150 },
  { field: 'col5', headerName: 'Status', width: 150 },
]

const columns = columnsDraft.map((col) => {
  if (col.field === 'col1') {
    return col
  }

  return {
    ...col,
    renderHeader(params: GridColumnHeaderParams<any, any, any>) {
      return (
        <strong className='font-semibold'>{params.colDef.headerName}</strong>
      )
    },
  }
})

const Table: FC<Data> = ({ data }) => {
  const { theme: applicationTheme } = useTheme()

  const darkTheme = createTheme({
    palette: {
      mode: applicationTheme === 'light' ? 'light' : 'dark',
    },
  })

  const rows = data.map((title:any, index) => ({
    id: title,
    col1: data[title],
    col2: data[title],
    col3: data[title],
    col4: data[title],
    col5: data[title],
  }))
  return (
    <ThemeProvider theme={darkTheme}>
      <DataGrid
        style={{
          backgroundColor: applicationTheme === 'light' ? 'white' : '#152238',
          fontSize: '1rem',
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        columns={columns}
        rows={rows}
      />
    </ThemeProvider>
  )
}

export default Table