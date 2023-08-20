
// import AddIcon from "@mui/icons-material/Add";
// import { IconButton, InputAdornment } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import { useState } from "react";
// // import { useIntl } from "react-intl";
// import MuiAutocomplete from "./CustomAutoComplete";

// const AsyncAutocompleteComponent = ({
//     value,
//     inputValue,
//     onClose,
//     handleChange,
//     handleChangeInput,
//     handleOpenCreateNewDialog,
//     horizontal,
//     labelStyles,
//     label,
//     disableClearable = false,
//     error = false,
//     helperText = "",
//     ...props
// }) => {
//     const [page, setPage] = useState(1);
//     const [options, setOptions] = useState([]);
//     const [open, setOpen] = useState(false);

//     const handleScroll = (event) => {
//         const listboxNode = event.currentTarget;

//         const position = listboxNode.scrollTop + listboxNode.clientHeight;
//         if (listboxNode.scrollHeight - position <= 1) {
//             props.loadMoreResults();
//         }
//     };

//     // const intl = useIntl();

//     return (
//         <div
//             style={{
//                 display: "flex",
//                 flexDirection: horizontal ? "row" : "column",
//                 justifyContent: "start",
//                 alignItems: horizontal ? "center" : "start",
//                 marginTop: 0,
//                 marginBottom: 3,
//                 width: "100%"
//             }}
//         >
//             <label
//                 htmlFor="input"
//                 style={{
//                     marginRight: 5,
//                     fontWeight: "bold",
//                     ...labelStyles
//                 }}
//             >
//                 {label}
//             </label>
//             <MuiAutocomplete
//                 style={{ width: "100%" }}
//                 options={props.options}
//                 autoHighlight
//                 getOptionLabel={(option) => option.title}
//                 isPaginated={props.isPaginated}
//                 totalOptions={props.totalOptions}
//                 value={value}
//                 disabled={props?.disabled}
//                 // isOptionEqualToValue={(option, value) => option.title === value.title}
//                 inputValue={inputValue}
//                 onClose={onClose}
//                 filterOptions={(x) => x}
//                 onChange={(e, v) => {
//                     handleChange(v);
//                 }}
//                 onInputChange={(e, v) => {
//                     handleChangeInput(e, v);
//                 }}
//                 onOpen={() => {
//                     props.loadMoreResults();
//                 }}
//                 renderInput={(params) => (
//                     <TextField
//                         {...params}
//                         // placeholder={intl.formatMessage({ id: "account" })}
//                         size="small"
//                         InputProps={{
//                             ...params.InputProps,
//                             endAdornment:
//                                 // open && !values[index] ? (
//                                 open && !value ? (
//                                     <InputAdornment position="end">
//                                         <IconButton onClick={handleOpenCreateNewDialog} edge="end">
//                                             <AddIcon color="primary" />
//                                         </IconButton>
//                                     </InputAdornment>
//                                 ) : (
//                                     params.InputProps.endAdornment
//                                 )
//                         }}
//                         error={error}
//                         helperText={helperText}
//                     />
//                 )}
//                 ListboxProps={{
//                     onScroll: handleScroll
//                 }}
//                 disableClearable={disableClearable}
//             />
//         </div>
//     );
// };

// export default AsyncAutocompleteComponent;