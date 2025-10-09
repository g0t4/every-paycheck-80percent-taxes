import { useState } from 'react'

interface TaxInputs {
  grossIncome: number
  householdSize: number
  homeValue: number
  carsOwned: number
  state: string
}

function App() {
  const [inputs, setInputs] = useState<TaxInputs>({
    grossIncome: 75000,
    householdSize: 3,
    homeValue: 300000,
    carsOwned: 2,
    state: 'average'
  })

  const calculateTaxBurden = () => {
    const { grossIncome, homeValue, carsOwned } = inputs

    // Federal income tax (simplified effective rate for middle class)
    const federalIncome = grossIncome * 0.18

    // FICA (15.3% - including employer portion which is actually your cost)
    const fica = grossIncome * 0.153

    // State/local income tax (average ~8%)
    const stateIncome = grossIncome * 0.08

    // Property taxes (1.1% of home value annually)
    const propertyTax = homeValue * 0.011

    // Sales tax (assume 10% rate on 30% of gross income spent on taxable goods)
    const salesTax = (grossIncome * 0.3) * 0.10

    // Embedded corporate taxes (15% of what you buy - roughly 40% of income)
    const embeddedCorporateTax = (grossIncome * 0.4) * 0.15

    // Car registration/taxes
    const carTax = carsOwned * 750

    // Gas taxes (assume average family uses 500 gallons/year per car)
    const gasTax = carsOwned * 500 * 0.55

    // Utility taxes (cell, electric, gas, internet - estimate $200/month total)
    const utilityTax = 2400

    // Inflation tax (assume 3% erosion of purchasing power)
    const inflationTax = grossIncome * 0.03

    const totalTaxes = federalIncome + fica + stateIncome + propertyTax +
                       salesTax + embeddedCorporateTax + carTax + gasTax +
                       utilityTax + inflationTax

    const effectiveRate = (totalTaxes / grossIncome) * 100
    const takeHome = grossIncome - totalTaxes

    return {
      totalTaxes,
      effectiveRate,
      takeHome,
      breakdown: {
        federalIncome,
        fica,
        stateIncome,
        propertyTax,
        salesTax,
        embeddedCorporateTax,
        carTax,
        gasTax,
        utilityTax,
        inflationTax
      }
    }
  }

  const results = calculateTaxBurden()

  return (
    <>
      <h1>Tax Burden Calculator</h1>
      <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
        Calculate the <em>real</em> percentage of your paycheck that goes to taxes.
      </p>

      <div className="form-group">
        <label>Annual Gross Income</label>
        <input
          type="number"
          value={inputs.grossIncome}
          onChange={(e) => setInputs({ ...inputs, grossIncome: Number(e.target.value) })}
        />
      </div>

      <div className="form-group">
        <label>Household Size</label>
        <input
          type="number"
          value={inputs.householdSize}
          onChange={(e) => setInputs({ ...inputs, householdSize: Number(e.target.value) })}
        />
      </div>

      <div className="form-group">
        <label>Home Value</label>
        <input
          type="number"
          value={inputs.homeValue}
          onChange={(e) => setInputs({ ...inputs, homeValue: Number(e.target.value) })}
        />
      </div>

      <div className="form-group">
        <label>Number of Cars</label>
        <input
          type="number"
          value={inputs.carsOwned}
          onChange={(e) => setInputs({ ...inputs, carsOwned: Number(e.target.value) })}
        />
      </div>

      <div className="results">
        <h2>Your Tax Burden</h2>
        <div className="result-item">
          Total Taxes Paid: <strong>${results.totalTaxes.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong>
        </div>
        <div className="result-item">
          Effective Tax Rate: <strong>{results.effectiveRate.toFixed(1)}%</strong>
        </div>
        <div className="result-item">
          Actual Take Home: <strong>${results.takeHome.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong>
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Breakdown</h3>
        <div style={{ fontSize: '0.95rem' }}>
          <div>Federal Income Tax: ${results.breakdown.federalIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
          <div>FICA (incl. employer portion): ${results.breakdown.fica.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
          <div>State/Local Income Tax: ${results.breakdown.stateIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
          <div>Property Tax: ${results.breakdown.propertyTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
          <div>Sales Tax: ${results.breakdown.salesTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
          <div>Embedded Corporate Taxes: ${results.breakdown.embeddedCorporateTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
          <div>Car Registration/Taxes: ${results.breakdown.carTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
          <div>Gas Taxes: ${results.breakdown.gasTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
          <div>Utility Taxes: ${results.breakdown.utilityTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
          <div>Inflation Tax: ${results.breakdown.inflationTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
        </div>
      </div>
    </>
  )
}

export default App
