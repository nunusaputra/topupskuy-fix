import React, { useEffect } from "react";
import $ from "jquery";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/js/dataTables.dataTables.min.js";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

DataTable.use(DT);

const RiwayatTransaksi = () => {
  useEffect(() => {
    $("#transactionTable").DataTable();
  }, []);

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
