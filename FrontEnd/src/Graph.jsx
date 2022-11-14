import React from "react";
import { Container, Box } from "@mui/material";
import { Area, XAxis, YAxis, Tooltip, Legend, AreaChart } from "recharts";
const Graph = (CurrencyData) => {
  const data = CurrencyData?.data?.map((data) => {
    let date = new Date(data.date * 1000);
    if (CurrencyData.coin === 1) {
      return {
        name: date.toLocaleString(),
        pkr: data.price2,
        usd: data.price,
      };
    } else if (CurrencyData.coin === 2) {
      return {
        name: date.toLocaleString(),
        GBP: data.price2,
        JPY: data.price,
      };
    }
  });

  return (
    <div>
      <Container>
        <Box>
          <AreaChart
            style={{ margin: "auto" }}
            height={550}
            width={900}
            data={data}
            margin={{
              top: 65,
              right: 0,
              left: 70,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" tick={false} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey={CurrencyData.coin === 1 ? "pkr" : "GBP"}
              stroke="#8884d8"
              fill="#4d0000"
            />
            <Area
              type="monotone"
              dataKey={CurrencyData.coin === 1 ? "usd" : "JPY"}
              stroke="#8884d8"
              fill="red"
            />
          </AreaChart>
        </Box>
      </Container>
    </div>
  );
};

export default Graph;
