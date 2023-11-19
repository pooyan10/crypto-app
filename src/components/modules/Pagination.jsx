import React from "react";
import { Pagination, Button } from "@nextui-org/react";

export default function Paginations({ currentPage, setCurrentPage }) {
  return (
    <div className="my-8 flex flex-col justify-center gap-2  sm:flex-row">
      <Button
        className="w-fit"
        size="md"
        variant="flat"
        color="secondary"
        onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
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
      >
        Next
      </Button>
    </div>
  );
}
