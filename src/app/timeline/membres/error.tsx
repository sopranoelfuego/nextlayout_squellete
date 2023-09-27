"use client"; // Error components must be Client Components

import ErrorComponent from "@/components/common/ErrorComponent";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorComponent error={error} reset={reset} />;
}
