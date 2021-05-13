import React, { useEffect, useState } from "react";
import {
    Center,
    Input,
    InputGroup,
    Stack,
    InputLeftAddon,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import ExcelReader from "./ExcelReader";

const ExcelProcessor = ({ parentData, parentSetData }) => {
    const [rawData, setRawData] = useState();
    const [data, setData] = useState([]);

    const handleFileChange = (data) => {
        setRawData(data);
    }

    useEffect(() => {
        parentSetData({ ...parentData, data: data });
    }, [data])

    useEffect(() => {
        if (rawData === undefined || rawData.length === 0) return;
        if (data.length === 0) {
            const newData = [];
            for (let i = 0; i < rawData.length; i++) {
                const object = {};
                object["年度"] = rawData[i]["交換年度"];
                object["派遣國家"] = rawData[i]["交換國家"];
                object["中文姓名"] = rawData[i]["中文姓名"];
                object["英文名"] = rawData[i]["英文姓名"];
                newData.push(object);
            }
            setData(newData);
        }
    }, [rawData])
    return (
        <Center>
            <Stack spacing={4}>
                <InputGroup size="lg">
                    <InputLeftAddon children="今年年度" />
                    <Input placeholder="今年年度" defaultValue="20-21" onChange={(event) => parentSetData({ ...parentData, year: event.target.value })} />
                </InputGroup>

                <InputGroup size="lg">
                    <Input placeholder="活動名稱第一行" defaultValue="22-23長期outbound研習會" size="lg" onChange={(event) => parentSetData({ ...parentData, event_name_1: event.target.value })} />
                    <Input placeholder="活動名稱第二行" defaultValue="英文PPT簡報" size="lg" onChange={(event) => parentSetData({ ...parentData, event_name_2: event.target.value })} />
                </InputGroup>
                <ExcelReader handleFileChange={handleFileChange} />
                <Table variant="striped" colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>年度</Th>
                            <Th>派遣國家</Th>
                            <Th>中文姓名</Th>
                            <Th>英文名</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((obj, idx) => (
                            <Tr>
                                <Td>
                                    <Input id={idx} key={"年度" + idx} placeholder="年度" defaultValue={obj["年度"]}
                                        onChange={
                                            (event) => {
                                                setData([...data].map((innerObj, innerIdx) => {
                                                    if (idx === innerIdx) {
                                                        return {
                                                            ...innerObj,
                                                            ["年度"]: event.target.value
                                                        }
                                                    }
                                                    else return innerObj
                                                }))
                                            }}
                                    />
                                </Td>
                                <Td>
                                    <Input id={idx} key={"派遣國家" + idx} placeholder="派遣國家" defaultValue={obj["派遣國家"]}
                                        onChange={
                                            (event) => {
                                                setData([...data].map((innerObj, innerIdx) => {
                                                    if (idx === innerIdx) {
                                                        return {
                                                            ...innerObj,
                                                            ["派遣國家"]: event.target.value
                                                        }
                                                    }
                                                    else return innerObj
                                                }))
                                            }}
                                    />
                                </Td>
                                <Td>
                                    <Input id={idx} key={"中文姓名" + idx} placeholder="中文姓名" defaultValue={obj["中文姓名"]}
                                        onChange={
                                            (event) => {
                                                setData([...data].map((innerObj, innerIdx) => {
                                                    if (idx === innerIdx) {
                                                        return {
                                                            ...innerObj,
                                                            ["中文姓名"]: event.target.value
                                                        }
                                                    }
                                                    else return innerObj
                                                }))
                                            }}
                                    />
                                </Td>
                                <Td>
                                    <Input id={idx} key={"英文名" + idx} placeholder="英文名" defaultValue={obj["英文名"]}
                                        onChange={
                                            (event) => {
                                                setData([...data].map((innerObj, innerIdx) => {
                                                    if (idx === innerIdx) {
                                                        return {
                                                            ...innerObj,
                                                            ["英文名"]: event.target.value
                                                        }
                                                    }
                                                    else return innerObj
                                                }))
                                            }}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Stack>
        </Center>)
}

export default ExcelProcessor;