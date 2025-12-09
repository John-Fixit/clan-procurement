import clsx from "clsx";
import React, { useCallback } from "react";
import { formatNumberWithComma } from "../../../../utils/formatCurrencyNumber";

const LocalPurchaseItemsView = ({ details }) => {
  const items = details?.procurement_items;

  console.log(items);

  const calculateTaxValue = useCallback((unit_price, tax) => {
    const taxNumber = Number(tax || 0);
    const priceNumber = Number(unit_price || 0);
    const taxValue = priceNumber * (taxNumber / 100);
    return taxValue;
  }, []);

  const calculateTotalAmount = useCallback(
    ({ unit_price, tax_value, quantity }) => {
      const taxNumber = Number(tax_value || 0);
      const priceNumber = Number(unit_price || 0);
      const totalAmount = priceNumber * quantity + taxNumber;

      return totalAmount;
    },
    []
  );

  return (
    <>
      <div className="border border-gray-300 p-6 rounded-lg">
        <h4 className="text-lg mb-3 font-primary">Procurement History</h4>
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-200 border-b border-gray-300">
              <tr>
                <th className="px-4 py-2 text-start">Item</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Unit Price</th>
                {/* <th className="py-2">Tax%</th> */}
                <th className="py-2">Tax value</th>
                <th className="py-2">Tax Amount</th>
                <th className="py-2 text-start">Total</th>
                <th className="py-2 text-start">Description</th>
              </tr>
            </thead>
            <tbody>
              {items?.length ? (
                items?.map((item, index) => {
                  const tax_value = calculateTaxValue(
                    item?.unit_price,
                    item?.tax
                  );
                  const totalAmount = calculateTotalAmount({
                    unit_price: item?.unit_price,
                    tax_value,
                    quantity: item?.quantity,
                  });
                  return (
                    <tr
                      key={index + "__procurement_items"}
                      className={clsx(index % 2 && "bg-gray-100", "")}
                    >
                      <td className="py-2 px-4">{item?.product_name}</td>
                      <td className="py-2 text-center">{item?.quantity}</td>
                      <td className="py-2 text-center">
                        {formatNumberWithComma(item?.unit_price)}
                      </td>
                      {/* <td className="py-2 text-center">{Number(item?.tax)}</td> */}
                      <td className="py-2 text-center">
                        {formatNumberWithComma(tax_value)}
                      </td>
                      <td className="py-2 text-center">
                        {formatNumberWithComma(0)}
                      </td>
                      <td className="py-2">
                        {formatNumberWithComma(totalAmount)}
                      </td>
                      <td className="py-2">{item?.description}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className="flex items-center justify-center h-44">
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="text-gray-500 text-sm font-medium">
                          No procurement items found
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LocalPurchaseItemsView;
