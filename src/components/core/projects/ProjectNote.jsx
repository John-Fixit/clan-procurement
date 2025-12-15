import { Input } from "antd";
import { Controller } from "react-hook-form";
import Button from "../../shared/ui/Button";
import { IoChevronBackOutline, IoChevronForwardSharp } from "react-icons/io5";

const { TextArea } = Input;

const ProjectNote = (props) => {
  const { control, handleSubmit, isSubmitting, handlePrev } = props;

  return (
    <>
      <main>
        <div className="space-y-6">
          {/* Note Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Notes
            </label>
            <Controller
              name="projectNote"
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <div>
                  <TextArea
                    {...field}
                    rows={8}
                    placeholder="Enter your project notes here..."
                    className="w-full"
                    maxLength={1000}
                    showCount
                    status={error ? "error" : ""}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error.message}</p>
                  )}
                </div>
              )}
            />
            <p className="text-gray-500 text-sm mt-2">
              Add any additional information or notes about this project.
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="border-t border-gray-200 mt-10 py-6 flex justify-between">
          <Button
            radius="sm"
            color="primary"
            variant="bordered"
            onPress={handlePrev}
          >
            <IoChevronBackOutline /> Previous
          </Button>
          <Button
            radius="sm"
            color="primary"
            //  onPress={handleNext}
            onPress={handleSubmit}
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </main>
    </>
  );
};

export default ProjectNote;
