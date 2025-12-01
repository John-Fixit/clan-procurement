import clsx from "clsx";
import React from "react";
import { formatNumberWithComma } from "../../../../utils/formatCurrencyNumber";

const LocalPurchaseItemsView = ({ details }) => {
  const items = details?.procurement_items;
  console.log(items);
  return (
    <>
      <div className="border border-gray-300 p-6 rounded-lg">
        <h4 className="text-lg mb-3">Procurement History</h4>
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-200 border-b border-gray-300">
              <tr>
                <th className="py-2">Item</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Unit Price</th>
                <th className="py-2">Tax</th>
                <th className="py-2 text-start">Total</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr
                  key={index + "__procurement_items"}
                  className={clsx(index % 2 && "bg-gray-100", "")}
                >
                  <td className="py-2">{item?.product}</td>
                  <td className="py-2 text-center">{item?.quantity}</td>
                  <td className="py-2 text-center">
                    {formatNumberWithComma(item?.unit_price)}
                  </td>
                  <td className="py-2 text-center">{Number(item?.tax)}</td>
                  <td className="py-2">{item?.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LocalPurchaseItemsView;
