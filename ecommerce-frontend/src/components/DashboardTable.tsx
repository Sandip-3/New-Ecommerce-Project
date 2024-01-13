import React from 'react'
import { Column } from 'react-table'
import Table from './Table'

const columns: Column<DataType>[] = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

type DataType = {
    id: string;
    quantity: number;
    discount: number;
    amount: number;
    status : string
}

const DashboardTable = ({data = []} : {data:DataType[]}) => {
    return Table<DataType>(columns, data, "transactionBox", "TopTransaction")();
}

export default DashboardTable