import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import {
  Grid,
  Box,
} from "@chakra-ui/react";
import ExcelProcessor from "./components/ExcelProcessor";

const App = () => {
  const [data, setData] = useState({
    year: "20-21",
    event_name_1: "22-23長期outbound研習會",
    event_name_2: "英文PPT簡報"
  });
  return (
    <Grid w="100vw" templateColumns="repeat(2,1fr)">
      <ExcelProcessor parentData={data} parentSetData={setData} />
      <Box w="100%">
        <Card parentData={data} />
      </Box>
    </Grid>
  );
};

export default App;
