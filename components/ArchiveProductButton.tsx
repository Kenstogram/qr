import { productArchive } from "@/actions/product-requests";
import { ReactNode } from "react";

export default function ArchiveProductButton({
  children,
  productId,
  onArchiveSuccess,
}: {
  children: ReactNode;
  productId: string;
  onArchiveSuccess: () => void; // Callback function to refresh products list
}) {
  const handleArchive = async () => {
    try {
      // Archive the product
      await productArchive(productId);
      // Call the callback function to refresh products list
      onArchiveSuccess();
    } catch (error) {
      console.error('Failed to archive product:', error);
    }
  };

  return (
    <button
      onClick={handleArchive}
      className="absolute right-2 top-2 z-30 text-black bg-stone-100 hover:bg-stone-600 truncate rounded-md px-2 py-1 dark:hover:bg-stone-700"
    >
      {children}
    </button>
  );
}
