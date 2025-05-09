import { Spinner } from "@heroui/react";

export const Loader = () => {
  return (
    <div className="fixed inset-x-0 inset-y-0 flex justify-center items-center bg-black/50 z-[100] ">
      <div className="p-[32px] bg-white rounded-xl opacity-100">
        <Spinner label="Loading..." variant="wave" size="lg" />
      </div>
    </div>
  );
};
