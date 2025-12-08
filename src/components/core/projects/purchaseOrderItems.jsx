import { Button } from "@heroui/react";
import { DatePicker, Input, InputNumber, Modal, Select } from "antd";
import { useMemo, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoChevronBackOutline, IoChevronForwardSharp } from "react-icons/io5";
import { LuTrash2 } from "react-icons/lu";
import { useCreateProduct, useGetProduct } from "../../../service/api/project";
import { useGetTax } from "../../../service/api/setting";
import { catchErrFunc } from "../../../utils/catchErrFunc";

const PurchaseOrderItems = (props) => {
  const {
    control,
    register,
    setValue,
    watch,
    newItemRow,
    handleNext,
    handlePrev,
  } = props;

  const [isOpen, setIsOpen] = useState({ status: false, currentIndex: null });

  const handleOpenModal = (index) => {
    setIsOpen({ status: true, currentIndex: index });
  };
  const handleCloseModal = () => {
    setIsOpen({ status: false });
  };

  const { data: get_tax, isPending: isLoadingTax } = useGetTax();
  const taxOptions = get_tax?.map((tax) => ({
    ...tax,
    value: tax?.ID,
    label: tax?.TAX_NAME + " (" + parseFloat(tax?.PERCENTAGE) + "%)",
  }));

  const { fields, append, remove } = useFieldArray({
    control,
    name: "purchase_order_items",
  });
  const {
    data: get_products_list,
    isPending: isLoadingProducts,
    refetch,
  } = useGetProduct();

  const productList = useMemo(() => {
    return (
      get_products_list?.map((product) => ({
        ...product,
        label: product?.PRODUCT_NAME,
        value: product?.PRODUCT_ID,
      })) || []
    );
  }, [get_products_list]);

  const watchFieldValues = watch("purchase_order_items");

  const calculateTotal = (index) => {
    const quantity = watch(`purchase_order_items.${index}.quantity`) || 0;
    const unitPrice = watch(`purchase_order_items.${index}.unit_price`) || 0;
    const total = quantity * unitPrice;
    setValue(`purchase_order_items.${index}.total_cost`, total);
    return total;
  };

  const handleIncrement = (index) => {
    const currentQuantity =
      watch(`purchase_order_items.${index}.quantity`) || 0;
    const newQuantity = Number(currentQuantity) + 1;
    setValue(`purchase_order_items.${index}.quantity`, newQuantity);
    // calculateTotal(index);
  };

  const handleDecrement = (index) => {
    const currentQuantity =
      watch(`purchase_order_items.${index}.quantity`) || 0;
    const newQuantity = Math.max(1, Number(currentQuantity) - 1); // Minimum quantity is 1
    setValue(`purchase_order_items.${index}.quantity`, newQuantity);
    calculateTotal(index);
  };

  const addNewItem = () => {
    // Ensure new item has default quantity of 1
    const itemWithDefaults = {
      ...newItemRow,
      quantity: 1,
    };
    append(itemWithDefaults);
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
            className="bg-white border border-gray-200 rounded-lg transition-shadow"
          >
            {/* Item Header */}
            <div className="flex justify-between items-center py-2 px-6 border-b border-gray-200 bg-gray-200 rounded-t-lg">
              <h4 className="text-sm font-semibold text-gray-700">
                Item #{index + 1}
              </h4>
              {fields?.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors"
                  title="Remove item"
                >
                  <LuTrash2 size={18} />
                </button>
              )}
            </div>

            {/* Item Fields - Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4 p-6">
              {/* product */}
              <div>
                <label className="block text-sm text-gray-700 mb-1 font-outfit">
                  Product
                </label>
                <Select
                  options={[
                    ...productList,
                    {
                      label: "Others",
                      value: "other",
                    },
                  ]}
                  className="w-full"
                  {...register(`purchase_order_items.${index}.product_id`)}
                  value={watch(`purchase_order_items.${index}.product_id`)}
                  onChange={(val) => {
                    if (val === "other") {
                      handleOpenModal(index);
                    } else {
                      setValue(`purchase_order_items.${index}.product_id`, val);
                    }
                  }}
                  loading={isLoadingProducts}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1 font-outfit">
                  Tax
                </label>
                <Select
                  options={taxOptions}
                  labelInValue
                  {...register(`purchase_order_items.${index}.tax`)}
                  value={watch(`purchase_order_items.${index}.tax.value`)}
                  onChange={(value, option) => {
                    setValue(`purchase_order_items.${index}.tax`, option);
                  }}
                  loading={isLoadingTax}
                  className="w-full"
                  placeholder="Select a tax"
                />
              </div>
              {/* <div>
                <label className="block text-sm text-gray-700 mb-1 font-outfit">
                  Date
                </label>
                <DatePicker
                  className="w-full"
                  {...register(`purchase_order_items.${index}.date`)}
                  value={
                    watch(`purchase_order_items.${index}.date`)
                      ? dayjs(watch(`purchase_order_items.${index}.date`))
                      : null
                  }
                  onChange={(date, dateString) =>
                    setValue(`purchase_order_items.${index}.date`, dateString)
                  }
                />
              </div> */}

              {/* Quantity */}
              <div>
                <label className="block text-sm text-gray-700 mb-1 font-outfit">
                  Quantity
                </label>
                <div className="flex gap-2 items-center">
                  <Button
                    isIconOnly
                    size="sm"
                    radius="sm"
                    color="primary"
                    onPress={() => handleDecrement(index)}
                    type="button"
                  >
                    <FaMinus size={14} />
                  </Button>
                  <Input
                    min="1"
                    type={"number"}
                    value={watch(`purchase_order_items.${index}.quantity`)}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!Number(val)) return;
                      const value = Math.max(1, Number(val) || 1);
                      setValue(`purchase_order_items.${index}.quantity`, value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "e") {
                        e.preventDefault();
                      }
                    }}
                    placeholder="1"
                    className="w-20"
                  />
                  <Button
                    isIconOnly
                    size="sm"
                    radius="sm"
                    color="primary"
                    onPress={() => handleIncrement(index)}
                    type="button"
                  >
                    <FaPlus size={14} />
                  </Button>
                </div>
              </div>

              {/* Unit Price */}
              <div>
                <label className="block text-sm text-gray-700 mb-1 font-outfit">
                  Unit Price (₦)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register(`purchase_order_items.${index}.unit_price`)}
                  // value={field.unit_price}
                  value={watchFieldValues?.[index]?.unit_price}
                  onChange={(e) =>
                    setValue(
                      `purchase_order_items.${index}.unit_price`,
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  placeholder="0.00"
                />
              </div>

              {/* Mode of Charge */}
              <div>
                <label className="block text-sm text-gray-700 mb-1 font-outfit">
                  Mode of Charge
                </label>
                <Input
                  type="text"
                  {...register(`purchase_order_items.${index}.vote_or_charge`)}
                  onChange={(e) =>
                    setValue(
                      `purchase_order_items.${index}.vote_or_charge`,
                      e.target.value
                    )
                  }
                  value={watchFieldValues?.[index]?.vote_or_charge}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  placeholder="Enter vote/charge"
                />
              </div>

              {/* Description - Full Width */}
              <div className="col-span-2 md:col-span-3">
                <label className="block text-sm text-gray-700 mb-1 font-outfit">
                  Description
                </label>
                <Input.TextArea
                  {...register(`purchase_order_items.${index}.description`)}
                  onChange={(e) =>
                    setValue(
                      `purchase_order_items.${index}.description`,
                      e.target.value
                    )
                  }
                  value={watchFieldValues?.[index]?.description}
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
        <FaPlus size={16} />
        Add Item
      </button>

      <div className="border-t border-gray-200 mt-10 py-6 flex justify-between">
        <Button
          radius="sm"
          color="primary"
          variant="bordered"
          onPress={handlePrev}
        >
          <IoChevronBackOutline /> Previous
        </Button>
        <Button radius="sm" color="primary" onPress={handleNext}>
          Continue <IoChevronForwardSharp />
        </Button>
      </div>

      <AddProductModal
        isOpen={isOpen.status}
        onClose={handleCloseModal}
        currentIndex={isOpen.currentIndex}
        setValue={setValue}
        refetch={refetch}
      />
    </div>
  );
};

export default PurchaseOrderItems;

const AddProductModal = ({
  isOpen,
  onClose,
  setValue,
  currentIndex,
  refetch,
}) => {
  const { mutateAsync: createProduct, isPending } = useCreateProduct();
  const [product, setProduct] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await createProduct({
        product_name: product,
      });
      if (res) {
        setValue(
          `purchase_order_items.${currentIndex}.product_id`,
          Number(res?.data)
        );
        await refetch();
        onClose();
      }
    } catch (error) {
      catchErrFunc(error);
    }
  };
  return (
    <Modal
      open={isOpen}
      title="CREATE CUSTOM PRODUCT"
      onCancel={onClose}
      footer={null}
    >
      <div>
        <div className="mb-4 flex-1 py-3">
          <label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Product Name
          </label>
          <Input
            size="large"
            placeholder="product nume"
            onChange={(e) => {
              setProduct(e.target.value);
            }}
            value={product}
          />
          <small className="text-danger-500"></small>
        </div>

        <div className="flex justify-end gap-2">
          <Button disabled={isPending} onPress={onClose}>
            Cancel
          </Button>
          <Button
            isLoading={isPending}
            onPress={handleSubmit}
            type="primary"
            className="bg-primary-500 hover:bg-primary-600 text-white border-none disabled:bg-blue-500 disabled:text-white    disabled:cursor-not-allowed disabled:border-none"
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
