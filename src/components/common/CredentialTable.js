import React from "react";
// import { Link } from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";
export default function CredentialTable({ data, editCredential }) {
  return (
    <div className="table-responsive main_table_div">
      <table className="table table-striped main_data_table">
        <thead>
          <tr>
            <th scope="col" className="border-0 font-size-4 font-weight-normal"
            title="Protocol">
              Protocol
            </th>
            <th
              scope="col"
              className=" border-0 font-size-4 font-weight-normal"
              title="CLient Name"
            >
              Client Name
            </th>
            <th scope="col" className="border-0 font-size-4 font-weight-normal"
            title="Host">
              Host
            </th>
            <th scope="col" className="border-0 font-size-4 font-weight-normal"
            title="Port">
              Port
            </th>
            <th scope="col" className="border-0 font-size-4 font-weight-normal"
            title="Encryption">
              Encryption
            </th>
            <th scope="col" className="border-0 font-size-4 font-weight-normal"
            title="Client ID">
              Client ID
            </th>
            <th scope="col" className="border-0 font-size-4 font-weight-normal"
            title="Client Secret">
              Client Secret
            </th>
            <th scope="col" className="border-0 font-size-4 font-weight-normal"
            title="Tenant ID">
              Tenant ID
            </th>
            <th scope="col" className="border-0 font-size-4 font-weight-normal"
            title="Action">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <th colSpan={11} className="bg-white text-center">
                No Data Found
              </th>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <th scope="row" className="pl-5 py-5 pr-0 text-capitalize">
                  {item.protocol || (
                    <small className="text-gray">
                      Field not needed for this protocol
                    </small>
                  )}
                </th>
                <td className="py-5 pr-0 text-break">
                  {item.username || (
                    <small className="text-gray">
                      Field not needed for this protocol
                    </small>
                  )}
                </td>
                <td className="py-5 pr-0 text-break">
                  {item.host || (
                    <small className="text-gray">
                      Field not needed for this protocol
                    </small>
                  )}
                </td>
                <td className="py-5 pr-0 text-break">
                  {item.port || (
                    <small className="text-gray">
                      Field not needed for this protocol
                    </small>
                  )}
                </td>
                <td className="py-5 pr-0 text-break">
                  {item.encryption || (
                    <small className="text-gray">
                      Field not needed for this protocol
                    </small>
                  )}
                </td>
                <td className="py-5 pr-0 text-break">
                  {item.client_id || (
                    <small className="text-gray">
                      Field not needed for this protocol
                    </small>
                  )}
                </td>
                <td className="py-5 pr-0 text-break">
                  {item.client_secret || (
                    <small className="text-gray">
                      Field not needed for this protocol
                    </small>
                  )}
                </td>
                <td className="py-5 pr-0 text-break">
                  {item.tenantId || (
                    <small className="text-gray">
                      Field not needed for this protocol
                    </small>
                  )}
                </td>
                {/* Edit credential button */}
                <td className="py-5">
                  <button
                    className="btn btn-outline-info action_btn"
                    onClick={() => editCredential(item)}
                    title="Contact"
                  >
                    <span className="text-gray px-1">
                      <FaRegEdit />{" "}
                    </span>
                    {/* <span className="fa fa-address-book text-gray px-1"></span> */}{" "}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
