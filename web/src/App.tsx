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
  const [showExplanations, setShowExplanations] = useState(false)

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

        <div style={{ marginTop: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h3 style={{ margin: 0 }}>Breakdown</h3>
          <button
            onClick={() => setShowExplanations(!showExplanations)}
            style={{
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            {showExplanations ? 'Hide' : 'Show'} Calculations
          </button>
        </div>
        <div style={{ fontSize: '0.95rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <div>Federal Income Tax: ${results.breakdown.federalIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            {showExplanations && <div style={{ fontSize: '0.85rem', color: '#666', marginLeft: '1rem', marginTop: '0.25rem' }}>
              18% × ${inputs.grossIncome.toLocaleString()} = ${results.breakdown.federalIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              <br/><em>Note: Simplified effective rate for middle class taxpayers</em>
            </div>}
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <div>FICA (incl. employer portion): ${results.breakdown.fica.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            {showExplanations && <div style={{ fontSize: '0.85rem', color: '#666', marginLeft: '1rem', marginTop: '0.25rem' }}>
              15.3% × ${inputs.grossIncome.toLocaleString()} = ${results.breakdown.fica.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              <br/><em>Note: Includes both employee (7.65%) and employer (7.65%) portions - the employer portion is economically your cost</em>
            </div>}
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <div>State/Local Income Tax: ${results.breakdown.stateIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            {showExplanations && <div style={{ fontSize: '0.85rem', color: '#666', marginLeft: '1rem', marginTop: '0.25rem' }}>
              8% × ${inputs.grossIncome.toLocaleString()} = ${results.breakdown.stateIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              <br/><em>Note: National average; varies by state (0-13%)</em>
            </div>}
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <div>Property Tax: ${results.breakdown.propertyTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            {showExplanations && <div style={{ fontSize: '0.85rem', color: '#666', marginLeft: '1rem', marginTop: '0.25rem' }}>
              1.1% × ${inputs.homeValue.toLocaleString()} = ${results.breakdown.propertyTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              <br/><em>Note: National average annual property tax rate</em>
            </div>}
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <div>Sales Tax: ${results.breakdown.salesTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            {showExplanations && <div style={{ fontSize: '0.85rem', color: '#666', marginLeft: '1rem', marginTop: '0.25rem' }}>
              10% × (30% × ${inputs.grossIncome.toLocaleString()}) = ${results.breakdown.salesTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              <br/><em>Note: Assumes 10% sales tax rate on 30% of income spent on taxable goods</em>
            </div>}
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <div>Embedded Corporate Taxes: ${results.breakdown.embeddedCorporateTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            {showExplanations && <div style={{ fontSize: '0.85rem', color: '#666', marginLeft: '1rem', marginTop: '0.25rem' }}>
              15% × (40% × ${inputs.grossIncome.toLocaleString()}) = ${results.breakdown.embeddedCorporateTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              <br/><em>Note: Estimated indirect business taxes passed to consumers through higher prices; assumes ~40% of income spent on goods/services subject to these taxes, with ~15% effective corporate tax burden embedded in prices</em>
            </div>}
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <div>Car Registration/Taxes: ${results.breakdown.carTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            {showExplanations && <div style={{ fontSize: '0.85rem', color: '#666', marginLeft: '1rem', marginTop: '0.25rem' }}>
              $750 × {inputs.carsOwned} cars = ${results.breakdown.carTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              <br/><em>Note: Average annual registration, title, and property taxes per vehicle</em>
            </div>}
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <div>Gas Taxes: ${results.breakdown.gasTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            {showExplanations && <div style={{ fontSize: '0.85rem', color: '#666', marginLeft: '1rem', marginTop: '0.25rem' }}>
              $0.55/gal × 500 gal/year × {inputs.carsOwned} cars = ${results.breakdown.gasTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              <br/><em>Note: Combined federal and state gas taxes; assumes 500 gallons per vehicle annually</em>
            </div>}
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <div>Utility Taxes: ${results.breakdown.utilityTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            {showExplanations && <div style={{ fontSize: '0.85rem', color: '#666', marginLeft: '1rem', marginTop: '0.25rem' }}>
              $200/month × 12 months = ${results.breakdown.utilityTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              <br/><em>Note: Estimated annual taxes and fees on cell phone, electric, gas, internet, and other utilities</em>
            </div>}
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <div>Inflation Tax: ${results.breakdown.inflationTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            {showExplanations && <div style={{ fontSize: '0.85rem', color: '#666', marginLeft: '1rem', marginTop: '0.25rem' }}>
              3% × ${inputs.grossIncome.toLocaleString()} = ${results.breakdown.inflationTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              <br/><em>Note: Loss of purchasing power due to monetary inflation; this is a de facto tax as government debt monetization transfers wealth from savers to borrowers</em>
            </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
