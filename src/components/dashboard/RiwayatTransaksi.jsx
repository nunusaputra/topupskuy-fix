import React, { useState, useEffect } from "react";
import $ from "jquery";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/js/dataTables.dataTables.min.js";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { API_URL } from "../../env";

DataTable.use(DT);

const RiwayatTransaksi = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");

  let table = null;
  useEffect(() => {
    table = $("#transactionTable").DataTable({
      serverSide: true,
      processing: true,
      ajax: {
        url: `${API_URL}/trx-user/${localStorage.getItem(
          "unique-code"
        )}/${selectedStatus}`,
        type: "GET",
        data: (d) => ({
          draw: d.draw,
          start: d.start,
          length: d.length,
          search: d.search?.value || "",
        }),
        dataSrc: (json) => json.data,
      },
      columns: [
        {
          data: null,
          title: "#",
          render: (data, type, row, meta) => meta.row + 1,
        },
        {
          data: "orderId",
          title: "No Pesanan",
        },
        {
          data: "product",
          title: "Product",
        },
        {
          data: "item",
          title: "Item",
        },
        {
          data: "payment",
          title: "Pembayaran",
        },
        {
          data: "status",
          title: "Status",
        },
        {
          data: null,
          title: "Aksi",
          orderable: false,
          searchable: false,
          render: (data, type, row) => {
            return `
              <a onclick="window.location.href='/payment/${row.orderId}'">
                Detail
              </a>
            `;
          },
        },
      ],
      order: [[1, "desc"]],
    }, [selectedStatus]);

    return () => {
      if ($.fn.DataTable.isDataTable("#transactionTable")) {
        table.destroy();
        $("#transactionTable").empty();
      }
    };
  }, [selectedStatus]);

  return (
    <div className="w-full lg:w-[80%] mt-6 lg:mt-0 flex flex-col gap-10">
      <div className="bg-secondary/80 p-4 rounded-xl overflow-hidden">
        <a href="/dashboard/profile">
          <div className="flex items-center gap-4 cursor-pointer border-b-2 pb-4">
            <i className="bi bi-arrow-left text-3xl text-white" />
            <h1 className="text-white text-lg font-semibold">
              Riwayat Transaksi
            </h1>
          </div>
        </a>

        {/* Filter Dropdown */}
        <div className="w-full my-4">
          <select
            id="statusFilter"
            className="w-full p-2 rounded-md text-black"
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">Semua</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Processing">Processing</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
            <option value="Expired">Expired</option>
            <option value="Canceled">Canceled</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>

        {/* Datatables */}
        <div className="text-white  overflow-x-auto">
          <table id="transactionTable" className="display w-full">
            <thead className="text-white">
              <tr className="bg-slate-800">
                <th>#</th>
                <th>No Pesanan</th>
                <th>Product</th>
                <th>Item</th>
                <th>Pembayaran</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>ML-0000000433-XWQOEZHP9MEL4OK</td>
                <td>Mobile Legends</td>
                <td>85 Diamonds (77 + 8 Bonus)</td>
                <td>DANA</td>
                <td>Success</td>
                <td>
                  <a href="#">Detail</a>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>ML-0000000433-XWQOEZHP9MEL4OK</td>
                <td>Mobile Legends</td>
                <td>85 Diamonds (77 + 8 Bonus)</td>
                <td>DANA</td>
                <td>Success</td>
                <td>
                  <a href="#">Detail</a>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>ML-0000000433-XWQOEZHP9MEL4OK</td>
                <td>Mobile Legends</td>
                <td>85 Diamonds (77 + 8 Bonus)</td>
                <td>DANA</td>
                <td>Success</td>
                <td>
                  <a href="#">Detail</a>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>ML-0000000433-XWQOEZHP9MEL4OK</td>
                <td>Mobile Legends</td>
                <td>85 Diamonds (77 + 8 Bonus)</td>
                <td>DANA</td>
                <td>Success</td>
                <td>
                  <a href="#">Detail</a>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>ML-0000000433-XWQOEZHP9MEL4OK</td>
                <td>Mobile Legends</td>
                <td>85 Diamonds (77 + 8 Bonus)</td>
                <td>DANA</td>
                <td>Success</td>
                <td>
                  <a href="#">Detail</a>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>ML-0000000433-XWQOEZHP9MEL4OK</td>
                <td>Mobile Legends</td>
                <td>85 Diamonds (77 + 8 Bonus)</td>
                <td>DANA</td>
                <td>Success</td>
                <td>
                  <a href="#">Detail</a>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>ML-0000000433-XWQOEZHP9MEL4OK</td>
                <td>Mobile Legends</td>
                <td>85 Diamonds (77 + 8 Bonus)</td>
                <td>DANA</td>
                <td>Success</td>
                <td>
                  <a href="#">Detail</a>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>ML-0000000433-XWQOEZHP9MEL4OK</td>
                <td>Mobile Legends</td>
                <td>85 Diamonds (77 + 8 Bonus)</td>
                <td>DANA</td>
                <td>Success</td>
                <td>
                  <a href="#">Detail</a>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>ML-0000000433-XWQOEZHP9MEL4OK</td>
                <td>Mobile Legends</td>
                <td>85 Diamonds (77 + 8 Bonus)</td>
                <td>DANA</td>
                <td>Success</td>
                <td>
                  <a href="#">Detail</a>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>ML-0000000433-XWQOEZHP9MEL4OK</td>
                <td>Mobile Legends</td>
                <td>85 Diamonds (77 + 8 Bonus)</td>
                <td>DANA</td>
                <td>Success</td>
                <td>
                  <a href="#">Detail</a>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>ML-0000000433-XWQOEZHP9MEL4OK</td>
                <td>Mobile Legends</td>
                <td>85 Diamonds (77 + 8 Bonus)</td>
                <td>DANA</td>
                <td>Success</td>
                <td>
                  <a href="#">Detail</a>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>ML-0000000433-XWQOEZHP9MEL4OK</td>
                <td>Mobile Legends</td>
                <td>85 Diamonds (77 + 8 Bonus)</td>
                <td>DANA</td>
                <td>Success</td>
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

export default RiwayatTransaksi;
