"use client"; // Error components must be Client Components

import { SnackAlertContext } from "@/components/contexts/snackAlertContext";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useContext, useEffect } from "react";
import { HiOutlineRefresh } from "react-icons/hi";

import { FormattedMessage, useIntl } from "react-intl";
export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const intl = useIntl();
  const { handleOpenAlert } = useContext(SnackAlertContext);

  // useEffect(() => {
  //   if (error) handleOpenAlert(`${intl.formatMessage({ id: "error-messag" })}`);
  // }, [error, handleOpenAlert, intl]);

  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Stack
        sx={{ margin: "0 auto", width: "fit-content", marginTop: "1rem" }}
        spacing={{ xs: 1, sm: 2 }}
      >
        <p className="text-xs opacity-60 font-semibold ">
          <FormattedMessage id="err_message" />
        </p>

        <button
          className={`bg-mainColor hover:bg-white border hover:border-mainColor transition-all duration-500 hover:text-mainColor text-sm   rounded-full py-2 text-white flex items-center gap-1  justify-center  `}
          onClick={() => reset()}
        >
          <HiOutlineRefresh fontSize={20} /> <FormattedMessage id="ressayer" />
        </button>
      </Stack>
    </Box>
  );
}
