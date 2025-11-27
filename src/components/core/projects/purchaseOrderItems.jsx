import { Input } from "antd";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";

const PurchaseOrderItems = (props) => {
  const { control, register, setValue, watch, newItemRow } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "purchase_order_items",
  });

  const calculateTotal = (index) => {
    const quantity = watch(`purchase_order_items.${index}.quantity`) || 0;
    const unitPrice = watch(`purchase_order_items.${index}.unit_price`) || 0;
    const total = quantity * unitPrice;
    setValue(`purchase_order_items.${index}.total_cost`, total);
    return total;
  };

  const addNewItem = () => {
    append(newItemRow);
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Delivery Items</h3>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="bg-white border border-gray-200 rounded-lg  transition-shadow"
          >
            {/* Item Header */}
            <div className="flex justify-between items-center py-2 px-6 border-b border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700">
                Item #{index + 1}
              </h4>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors"
                title="Remove item"
              >
                <LuTrash2 size={18} />
              </button>
            </div>

            {/* Item Fields - Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4 p-6">
              {/* Date */}
              <div>
                <label className="block text-sm text-gray-700 mb-1 font-outfit">
                  Date
                </label>
                <Input
                  type="date"
                  {...register(`purchase_order_items.${index}.date`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm text-gray-700 mb-1 font-outfit">
                  Quantity
                </label>
                <Input
                  type="number"
                  {...register(`purchase_order_items.${index}.quantity`, {
                    onChange: () => calculateTotal(index),
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1 font-outfit">
                  Unit Price (₦)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register(`purchase_order_items.${index}.unit_price`, {
                    onChange: () => calculateTotal(index),
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  placeholder="0.00"
                />
              </div>

              {/* Vote of Charge */}
              <div>
                <label className="block text-sm text-gray-700 mb-1 font-outfit">
                  Vote of Charge
                </label>
                <Input
                  type="text"
                  {...register(`purchase_order_items.${index}.vote_or_charge`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  placeholder="Enter vote/charge"
                />
              </div>

              {/* Description - Full Width */}
              <div className="col-span-2 md:col-span-3 lg:col-span-4">
                <label className="block text-sm text-gray-700 mb-1 font-outfit">
                  Description
                </label>
                <Input.TextArea
                  {...register(`purchase_order_items.${index}.description`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm"
                  placeholder="Enter detailed item description"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addNewItem}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 cursor-pointer transition-colors font-medium text-sm"
      >
        <FaPlus size={18} />
        Add Item
      </button>
    </div>
  );
};

export default PurchaseOrderItems;
