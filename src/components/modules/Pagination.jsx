import React from "react";
import { Pagination, Button } from "@nextui-org/react";

export default function Paginations({
  currentPage,
  setCurrentPage,
  handleClick,
}) {
  return (
    <div className="mb-14 mt-12 flex flex-col justify-center gap-2  sm:flex-row">
      <Button
        className="w-fit"
        size="md"
        variant="flat"
        color="secondary"
        onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        onClick={handleClick}
      >
        Previous
      </Button>
      <Pagination
        showShadow
        size="lg"
        total={10}
        color="secondary"
        page={currentPage}
        onChange={setCurrentPage}
      />
      <Button
        className="w-fit"
        size="md"
        variant="flat"
        color="secondary"
        onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}
        onClick={handleClick}
      >
        Next
      </Button>
    </div>
  );
}
