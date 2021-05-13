import React, { useEffect, useState } from 'react';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';

const ExcelReader = ({ handleFileChange }) => {
    const [file, setFile] = useState({});
    const [data, setData] = useState([]);
    const [cols, setCols] = useState([]);


    const handleChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) setFile(files[0]);
    };

    const handleFile = () => {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const new_data = XLSX.utils.sheet_to_json(ws).sort((a, b) => {
                return a["交換年度"] < b["交換年度"] ? -1 : 1;
            });
            /* Update state */
            setData(new_data);
            handleFileChange(new_data);
            setCols(make_cols(ws['!ref']));

        };

        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        };
    }

    return (
        <div>
            <label htmlFor="file">Upload an excel to Process Triggers</label>
            <br />
            <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={handleChange} />
            <br />
            <input type='submit'
                value="Process Triggers"
                onClick={handleFile} />
        </div>

    )
}

export default ExcelReader;