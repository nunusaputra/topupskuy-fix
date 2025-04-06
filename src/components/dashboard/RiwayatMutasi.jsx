import React, { useEffect } from "react";
import $ from "jquery";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/js/dataTables.dataTables.min.js";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { API_URL } from "../../env";
import moment from 'moment';

DataTable.use(DT);

const RiwayatMutasi = () => {
  let table = null;

  useEffect(() => {
    table = $('#transactionTable').DataTable({
      serverSide: true,
      processing: true,
      ajax: {
        url: `${API_URL}/transaction`,
        type: 'GET',
        data: (d) => ({
          draw: d.draw,
          start: d.start,
          length: d.length,
          search: d.search?.value || '',
          userLogged: localStorage.getItem("unique-code"),
          menuType: "All"
        }),
        dataSrc: (json) => json.data.content
      },
      columns: [
        {
          data: null,
          title: '#',
          render: (data, type, row, meta) => meta.row + 1
        },
        { data: 'orderId', title: 'Transaksi Id' },
        { data: 'type', title: 'Tipe Transaksi' },
        {
          data: 'previousBalance',
          title: 'Saldo Sebelum',
          render: (data) => new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(data || 0)
        },
        {
          data: 'finalBalance',
          title: 'Saldo Sesudah',
          render: (data) => new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(data || 0)
        },
        {
          data: 'trxDate',
          title: 'Tanggal',
          render: (data) => moment(data).format('DD MMM YYYY HH:mm')
        },
        {
          data: null,
          title: 'Aksi',
          orderable: false,
          searchable: false,
          render: (dataRow, type, row) => {
            if (row.type === "Membership") {
              return `
          <a onclick="window.location.href='/payment/${row.orderId}'">
            Detail
          </a>
        `;
            } else if (row.type === "Product") {
              return `
          <a onclick="window.location.href='/payment/${row.orderId}'">
            Detail
          </a>
        `;
            } else {
              return `
          <a onclick="window.location.href='/payment/${row.orderId}'">
            Detail
          </a>
        `;
            }
          }
        }
      ],
      order: [[1, 'desc']]
    });
  }, []);

  return (
    <div className="w-full lg:w-[80%] mt-6 lg:mt-0 flex flex-col gap-10">
      <div className="bg-secondary/80 p-4 rounded-xl overflow-hidden">
        <a href="/dashboard/profile">
          <div className="flex items-center gap-4 cursor-pointer border-b-2 pb-4">
            <i className="bi bi-arrow-left text-3xl text-white" />
            <h1 className="text-white text-lg font-semibold">Riwayat Mutasi</h1>
          </div>
        </a>
        {/* Datatables */}
        <div className="text-white  overflow-x-auto">
          <table id="transactionTable" className="display w-full">
            <thead className="text-white">
              <tr className="bg-slate-800">
                <th>#</th>
                <th>Transaksi ID</th>
                <th>Tipe Transaksi</th>
                <th>Saldo Sebelum</th>
                <th>Saldo Sesudah</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>ML-0000000433-XWQOEZHP9MEL4OK</td>
                <td>Product</td>
                <td>Rp. 207</td>
                <td>Rp. 1.646</td>
                <td>1 Apr 2025 14:41</td>
                <td>
                  <a href="#">Detail</a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>ML-0000000433-XWQOEZHP9MEL4OK</td>
                <td>Product</td>
                <td>Rp. 207</td>
                <td>Rp. 1.646</td>
                <td>1 Apr 2025 14:41</td>
                <td>
                  <a href="#">Detail</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiwayatMutasi;
