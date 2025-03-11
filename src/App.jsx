"use client"

import { useState, useEffect } from "react"
import * as XLSX from "xlsx"
import Papa from "papaparse"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import 'boxicons'
export default function CarbonCalculator() {
  const [method, setMethod] = useState("supplier")
  const [entries, setEntries] = useState([{ amount: "", factor: "", name: `Entry 1` }])
  const [totalEmissions, setTotalEmissions] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [activeTab, setActiveTab] = useState("manual")
  const [showChart, setShowChart] = useState(false)

  const handleInputChange = (index, field, value) => {
    setEntries((prevEntries) => prevEntries.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry)))
  }

  const addEntry = () => {
    setEntries((prevEntries) => [...prevEntries, { amount: "", factor: "", name: `Entry ${prevEntries.length + 1}` }])
  }

  const removeEntry = (index) => {
    if (entries.length > 1) {
      setEntries((prevEntries) => {
        const newEntries = prevEntries.filter((_, i) => i !== index)
        // Rename entries to keep them sequential
        return newEntries.map((entry, i) => ({
          ...entry,
          name: `Entry ${i + 1}`,
        }))
      })
    }
  }

  const calculateEmissions = () => {
    setIsCalculating(true)

    // Simulate calculation delay for better UX
    setTimeout(() => {
      const total = entries.reduce((sum, entry) => {
        const amount = Number.parseFloat(entry.amount)
        const factor = Number.parseFloat(entry.factor)
        return isNaN(amount) || isNaN(factor) ? sum : sum + amount * factor
      }, 0)

      setTotalEmissions(total)
      setIsCalculating(false)
    }, 800)
  }

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const fileExtension = file.name.split(".").pop()?.toLowerCase()
    const reader = new FileReader()

    reader.onerror = () => {
      setIsUploading(false)
      alert("Error reading file. Please try again.")
    }

    if (fileExtension === "csv") {
      Papa.parse(file, {
        complete: (result) => {
          if (!result.data || result.data.length < 2) {
            alert("Invalid CSV format. Ensure correct columns.")
            setIsUploading(false)
            return
          }

          const formattedEntries = result.data
            .slice(1)
            .map((row, index) => ({
              name: `Entry ${index + 1}`,
              amount: row[2] || "", // Extract from 'Quantity' column
              factor: row[3] || "", // Extract from 'Emission Factor' column
            }))
            .filter((entry) => entry.amount && entry.factor)

          setEntries(formattedEntries.length ? formattedEntries : [{ amount: "", factor: "", name: "Entry 1" }])
          setIsUploading(false)
        },
        header: false,
      })
    } else if (fileExtension === "xlsx" || fileExtension === "xls") {
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result)
          const workbook = XLSX.read(data, { type: "array" })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

          if (jsonData.length < 2) {
            alert("Invalid Excel format. Ensure correct columns.")
            setIsUploading(false)
            return
          }

          const formattedEntries = jsonData
            .slice(1)
            .map((row, index) => ({
              name: `Entry ${index + 1}`,
              amount: row[2] || "", // Extract from 'Quantity' column
              factor: row[3] || "", // Extract from 'Emission Factor' column
            }))
            .filter((entry) => entry.amount && entry.factor)

          setEntries(formattedEntries.length ? formattedEntries : [{ amount: "", factor: "", name: "Entry 1" }])
          setIsUploading(false)
        } catch (error) {
          alert("Error processing Excel file.")
          setIsUploading(false)
        }
      }
      reader.readAsArrayBuffer(file)
    } else {
      alert("Unsupported file format. Please upload a CSV or XLSX file.")
      setIsUploading(false)
    }
  }

  const getChartData = () => {
    return entries
      .map((entry) => ({
        name: entry.name,
        emissions: Number.parseFloat(entry.amount) * Number.parseFloat(entry.factor) || 0,
      }))
      .filter((entry) => entry.emissions > 0)
  }

  const isFormValid = entries.some(
    (entry) =>
      entry.amount &&
      !isNaN(Number.parseFloat(entry.amount)) &&
      entry.factor &&
      !isNaN(Number.parseFloat(entry.factor)),
  )

  useEffect(() => {
    if (showChart) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showChart])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen">

   
    <div className=" w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-b">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <box-icon type='solid' name='leaf'/>
          Carbon Emission Calculator
        </h2>
        <p className="text-gray-600 mt-1">Calculate your carbon footprint based on activity data</p>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Tabs */}
        <div className="mb-6">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "manual"
                  ? "border-b-2 border-emerald-500 text-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("manual")}
            >
              Manual Entry
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "import"
                  ? "border-b-2 border-emerald-500 text-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("import")}
            >
              Import Data
            </button>
          </div>
        </div>

        {/* Manual Entry Tab */}
        {activeTab === "manual" && (
          <div className="space-y-6">
            <div>
              <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">
                Calculation Method
              </label>
              <select
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="supplier">Supplier-Specific Method</option>
                <option value="spend">Spend-Based Method</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Emission Sources</label>
                <button
                  onClick={addEntry}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Entry
                </button>
              </div>

              {entries.map((entry, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-5">
                    <input
                      type="number"
                      placeholder={method === "supplier" ? "Amount (units)" : "Amount ($)"}
                      value={entry.amount}
                      onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div className="col-span-5 relative flex justify-center items-center">
                    <input
                      type="number"
                      placeholder={method === "supplier" ? "Factor (kg CO₂/unit)" : "Factor (kg CO₂/$)"}
                      value={entry.factor}
                      onChange={(e) => handleInputChange(index, "factor", e.target.value)}
                      className="w-[90%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <div className="group relative inline-block">
                      <button className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      </button>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs rounded py-1 px-2 absolute z-10 right-0 mt-1 w-48">
                        Emission factor converts activity data to emissions
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 flex justify-center">
                    <button
                      onClick={() => removeEntry(index)}
                      disabled={entries.length === 1}
                      className={`p-1.5 rounded-full ${
                        entries.length === 1 ? "text-gray-300 cursor-not-allowed" : "text-red-500 hover:bg-red-50"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Import Tab */}
        {activeTab === "import" && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Import from file</h3>
            <p className="mt-1 text-sm text-gray-500">Upload a CSV or Excel file with your emission data</p>
            <div className="mt-6">
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Choose File
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            {isUploading && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Uploading...</p>
                <div className="w-1/2 mx-auto bg-gray-200 rounded-full h-2.5">
                  <div className="bg-emerald-600 h-2.5 rounded-full w-1/2"></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Calculate Button */}
        <div className="mt-6">
          <button
            onClick={calculateEmissions}
            disabled={!isFormValid || isCalculating}
            className={`w-full py-3 px-4 rounded-md text-white font-medium ${
              !isFormValid || isCalculating
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            }`}
          >
            {isCalculating ? "Calculating..." : "Calculate Emissions"}
          </button>
        </div>

        {/* Results */}
        {totalEmissions !== null && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">Results</h3>
              <p className="mt-2 text-3xl font-bold text-emerald-600">
                {totalEmissions.toFixed(2)} <span className="text-lg font-normal text-gray-600">kg CO₂e</span>
              </p>
            </div>

            {getChartData().length > 0 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowChart(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  View Emissions Chart
                </button>
              </div>
            )}
          </div>
        )}

        {/* Chart Popup */}
        {showChart && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl transform transition-all ease-in-out duration-300 scale-100 opacity-100">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Emissions by Entry</h3>
                  <button
                    onClick={() => setShowChart(false)}
                    className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getChartData()}>
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value} kg`} />
                      <Tooltip
                        formatter={(value) => [`${Number(value).toFixed(2)} kg CO₂e`, "Emissions"]}
                        contentStyle={{
                          borderRadius: "0.375rem",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }}
                      />
                      <Bar dataKey="emissions" fill="#059669" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}

