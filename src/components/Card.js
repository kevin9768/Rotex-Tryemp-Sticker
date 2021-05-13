import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import font from "../Noto Sans TC.ttf";

const Card = ({ parentData }) => {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    console.log(parentData.data);
    if (parentData.data && parentData.data.length > 0) {
      const newList = [];
      let tmpList = [];
      for (let i = 0; i < parentData.data.length; i++) {
        if (i % 2 === 0) {
          tmpList.push(parentData.data[i]);
        }
        else {
          tmpList.push(parentData.data[i]);
          newList.push(tmpList);
          tmpList = [];
        }
      }
      if (tmpList.length !== 0)
        newList.push(tmpList);

      setFormattedData(newList);
    }
    console.log("Formatted: ", formattedData);
  }, [parentData.data])

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.body}>
          <View style={styles.container}>
            {formattedData ? formattedData.map((obj) => (
              <View style={styles.row}>
                <View style={(obj[0]["年度"] + "").slice(0, 2) < parentData.year.slice(0, 2) - 1 ? styles.cell_rotex : styles.cell_rebound}>
                  <View style={styles.cell_title_wrapper}>
                    <Image
                      src="https://i.ibb.co/h7B1wJr/image1.png"
                      style={styles.logo}
                    />
                    <View style={styles.title}>
                      <View>
                        <Text style={styles.title_text}>
                          台灣國際扶輪青少年交換協會
                        </Text>
                        <Text style={styles.title_text}>20{parentData.year}年度</Text>
                      </View>
                      <View style={{ marginTop: "5px" }}>
                        <Text style={styles.title_text}>
                          {parentData.event_name_1}
                        </Text>
                        <Text style={styles.title_text}>{parentData.event_name_2}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.name}>{obj[0]["中文姓名"] + " " + obj[0]["英文名"]}</Text>
                  <Text style={styles.country}>{obj[0]["年度"]} 派遣 {obj[0]["派遣國家"]}</Text>
                </View>
                {obj[1] && <View style={(obj[1]["年度"] + "").slice(0, 2) < parentData.year.slice(0, 2) - 1 ? styles.cell_rotex : styles.cell_rebound}>
                  <View style={styles.cell_title_wrapper}>
                    <Image
                      src="https://i.ibb.co/h7B1wJr/image1.png"
                      style={styles.logo}
                    />
                    <View style={styles.title}>
                      <View>
                        <Text style={styles.title_text}>
                          台灣國際扶輪青少年交換協會
                        </Text>
                        <Text style={styles.title_text}>20{parentData.year}年度</Text>
                      </View>
                      <View style={{ marginTop: "5px" }}>
                        <Text style={styles.title_text}>
                          {parentData.event_name_1}
                        </Text>
                        <Text style={styles.title_text}>{parentData.event_name_2}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.name}>{obj[1]["中文姓名"] + " " + obj[1]["英文名"]}</Text>
                  <Text style={styles.country}>{obj[1]["年度"]} 派遣 {obj[1]["派遣國家"]}</Text>
                </View>}
              </View>
            )) : <></>}

          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}
Font.register({
  family: "NotoSansTC",
  format: "truetype",
  src: font,
});
const styles = StyleSheet.create({
  body: {},
  container: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  cell_rotex: {
    backgroundColor: "#4EADEA",
    color: "#FFFF54",
    width: "50%",
    height: "7.425cm",
  },
  cell_rebound: {
    backgroundColor: "#FDF2D0",
    color: "#000000",
    width: "50%",
    height: "7.425cm",
  },
  cell_title_wrapper: {
    display: "flex",
    flexDirection: "row",
  },
  logo: {
    height: "2.31cm",
    width: "2.62cm",
    marginLeft: "0.48cm",
    marginRight: "0.48cm",
    marginTop: "0.7cm",
  },
  title: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "0.48cm",
    marginTop: "0.5cm",
    fontSize: "12px",
    fontFamily: "NotoSansTC",
  },
  title_text: {
    marginLeft: "auto",
    fontFamily: "NotoSansTC",
  },
  name: {
    fontSize: "36px",
    marginTop: "10px",
    textAlign: "center",
    fontFamily: "NotoSansTC",
    marginHorizontal: "0.5cm",
    display: "inline",
  },
  country: {
    fontSize: "20px",
    marginTop: "3px",
    textAlign: "center",
    fontFamily: "NotoSansTC",
  },
});

export default Card;
