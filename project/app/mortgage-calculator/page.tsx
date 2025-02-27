"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, DollarSign, Home, Percent } from "lucide-react";
import Link from "next/link";

export default function MortgageCalculator() {
  // Default values
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [propertyTax, setPropertyTax] = useState(265);
  const [homeInsurance, setHomeInsurance] = useState(125);
  const [hoa, setHoa] = useState(0);
  const [zipCode, setZipCode] = useState("42105");

  // Calculated values
  const [monthlyPrincipalInterest, setMonthlyPrincipalInterest] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  // Helper function to ensure numbers are valid
  const validateNumber = (value: number, min: number, max: number) => {
    if (isNaN(value) || value < min) return min;
    if (value > max) return max;
    return value;
  };

  // Update home price with validation
  const handleHomePriceChange = (value: number) => {
    const validatedPrice = validateNumber(value, 50000, 2000000);
    setHomePrice(validatedPrice);

    // Update down payment to maintain the same percentage
    const newDownPayment = Math.round(
      (validatedPrice * downPaymentPercent) / 100
    );
    setDownPayment(newDownPayment);
  };

  // Update down payment with validation
  const handleDownPaymentChange = (value: number) => {
    const maxDownPayment = homePrice * 0.99; // 99% max down payment
    const validatedDownPayment = validateNumber(value, 0, maxDownPayment);
    setDownPayment(validatedDownPayment);

    // Update down payment percentage
    const newPercent = (validatedDownPayment / homePrice) * 100;
    setDownPaymentPercent(parseFloat(newPercent.toFixed(1)));
  };

  // Update down payment percentage with validation
  const handleDownPaymentPercentChange = (value: number) => {
    const validatedPercent = validateNumber(value, 0, 99);
    setDownPaymentPercent(validatedPercent);

    // Update down payment amount
    const newDownPayment = Math.round((homePrice * validatedPercent) / 100);
    setDownPayment(newDownPayment);
  };

  // Handle HOA fees with validation
  const handleHoaChange = (value: number) => {
    const validatedHoa = validateNumber(value, 0, 10000); // Setting reasonable max HOA
    setHoa(validatedHoa);
  };

  // Calculate monthly payment
  useEffect(() => {
    // Calculate loan amount
    const loanAmount = homePrice - downPayment;

    // Calculate monthly interest rate
    const monthlyInterestRate = interestRate / 100 / 12;

    // Calculate number of payments
    const numberOfPayments = loanTerm * 12;

    // Calculate monthly principal and interest
    let monthlyPI = 0;
    if (interestRate > 0) {
      monthlyPI =
        (loanAmount *
          (monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    } else {
      monthlyPI = loanAmount / numberOfPayments;
    }

    setMonthlyPrincipalInterest(Math.round(monthlyPI));

    // Calculate total monthly payment
    const monthlyPropertyTax = propertyTax;
    const monthlyHomeInsurance = homeInsurance;
    const monthlyHoa = hoa;

    const total =
      monthlyPI + monthlyPropertyTax + monthlyHomeInsurance + monthlyHoa;
    setMonthlyTotal(Math.round(total));
  }, [
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTax,
    homeInsurance,
    hoa,
  ]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Mortgage Calculator
            </h1>
            <p className="text-xl text-gray-700">
              Estimate your monthly mortgage payment, including principal,
              interest, taxes, and insurance.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Column */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mortgage Details</CardTitle>
                  <CardDescription>
                    Adjust the values to calculate your estimated monthly
                    payment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Home Price */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <label
                          htmlFor="homePrice"
                          className="text-sm font-medium"
                        >
                          Home Price
                        </label>
                        <span className="text-sm font-medium">
                          {formatCurrency(homePrice)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                        <Slider
                          id="homePrice"
                          min={50000}
                          max={2000000}
                          step={1000}
                          value={[homePrice]}
                          onValueChange={(value) =>
                            handleHomePriceChange(value[0])
                          }
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={homePrice}
                          onChange={(e) =>
                            handleHomePriceChange(Number(e.target.value))
                          }
                          className="w-24"
                        />
                      </div>
                    </div>

                    {/* Down Payment */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <label
                          htmlFor="downPayment"
                          className="text-sm font-medium"
                        >
                          Down Payment
                        </label>
                        <span className="text-sm font-medium">
                          {formatCurrency(downPayment)} ({downPaymentPercent}%)
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                        <Slider
                          id="downPayment"
                          min={0}
                          max={homePrice * 0.99}
                          step={1000}
                          value={[downPayment]}
                          onValueChange={(value) =>
                            handleDownPaymentChange(value[0])
                          }
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={downPayment}
                          onChange={(e) =>
                            handleDownPaymentChange(Number(e.target.value))
                          }
                          className="w-24"
                        />
                      </div>
                    </div>

                    {/* Loan Term */}
                    <div>
                      <label
                        htmlFor="loanTerm"
                        className="block text-sm font-medium mb-2"
                      >
                        Loan Term
                      </label>
                      <div className="flex gap-4">
                        {[15, 20, 30].map((term) => (
                          <Button
                            key={term}
                            type="button"
                            variant={loanTerm === term ? "default" : "outline"}
                            onClick={() => setLoanTerm(term)}
                            className="flex-1"
                          >
                            {term} years
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Interest Rate */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <label
                          htmlFor="interestRate"
                          className="text-sm font-medium"
                        >
                          Interest Rate
                        </label>
                        <span className="text-sm font-medium">
                          {interestRate}%
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Percent className="h-5 w-5 text-gray-400" />
                        <Slider
                          id="interestRate"
                          min={1}
                          max={10}
                          step={0.125}
                          value={[interestRate]}
                          onValueChange={(value) => setInterestRate(value[0])}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={interestRate}
                          onChange={(e) =>
                            setInterestRate(Number(e.target.value))
                          }
                          className="w-24"
                          step="0.125"
                        />
                      </div>
                    </div>

                    {/* Property Tax */}
                    <div>
                      <label
                        htmlFor="propertyTax"
                        className="block text-sm font-medium mb-2"
                      >
                        Property Tax (monthly)
                      </label>
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-gray-400 absolute ml-3" />
                        <Input
                          id="propertyTax"
                          type="number"
                          value={propertyTax}
                          onChange={(e) =>
                            setPropertyTax(Number(e.target.value))
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Home Insurance */}
                    <div>
                      <label
                        htmlFor="homeInsurance"
                        className="block text-sm font-medium mb-2"
                      >
                        Home Insurance (monthly)
                      </label>
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-gray-400 absolute ml-3" />
                        <Input
                          id="homeInsurance"
                          type="number"
                          value={homeInsurance}
                          onChange={(e) =>
                            setHomeInsurance(Number(e.target.value))
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* HOA Fees */}
                    <div>
                      <label
                        htmlFor="hoa"
                        className="block text-sm font-medium mb-2"
                      >
                        HOA Fees (monthly)
                      </label>
                      <div className="flex items-center gap-4">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                        <Slider
                          id="hoa"
                          min={0}
                          max={10000}
                          step={10}
                          value={[hoa]}
                          onValueChange={(value) => handleHoaChange(value[0])}
                          className="flex-1"
                        />
                        <Input
                          id="hoa"
                          type="number"
                          value={hoa}
                          onChange={(e) =>
                            handleHoaChange(Number(e.target.value))
                          }
                          className="w-24"
                        />
                      </div>
                    </div>

                    {/* ZIP Code */}
                    <div>
                      <label
                        htmlFor="zipCode"
                        className="block text-sm font-medium mb-2"
                      >
                        ZIP Code
                      </label>
                      <Input
                        id="zipCode"
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        maxLength={5}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Column */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Your Estimated Payment</CardTitle>
                  <CardDescription>Based on your inputs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">
                        Monthly Payment
                      </p>
                      <p className="text-4xl font-bold text-blue-600">
                        {formatCurrency(monthlyTotal)}
                      </p>
                    </div>

                    <Tabs defaultValue="breakdown">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
                        <TabsTrigger value="loanDetails">
                          Loan Details
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="breakdown" className="space-y-4 pt-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Principal & Interest
                          </span>
                          <span className="font-medium">
                            {formatCurrency(monthlyPrincipalInterest)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Property Tax</span>
                          <span className="font-medium">
                            {formatCurrency(propertyTax)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Home Insurance</span>
                          <span className="font-medium">
                            {formatCurrency(homeInsurance)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">HOA Fees</span>
                          <span className="font-medium">
                            {formatCurrency(hoa)}
                          </span>
                        </div>
                        <div className="border-t pt-4 flex justify-between">
                          <span className="font-medium">
                            Total Monthly Payment
                          </span>
                          <span className="font-bold">
                            {formatCurrency(monthlyTotal)}
                          </span>
                        </div>
                      </TabsContent>
                      <TabsContent
                        value="loanDetails"
                        className="space-y-4 pt-4"
                      >
                        <div className="flex justify-between">
                          <span className="text-gray-600">Loan Amount</span>
                          <span className="font-medium">
                            {formatCurrency(homePrice - downPayment)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Down Payment</span>
                          <span className="font-medium">
                            {formatCurrency(downPayment)} ({downPaymentPercent}
                            %)
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Loan Term</span>
                          <span className="font-medium">{loanTerm} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Interest Rate</span>
                          <span className="font-medium">{interestRate}%</span>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <Button
                      asChild
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Link
                        href="/start"
                        className="flex items-center justify-center"
                      >
                        Get Pre-Approved <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Understanding Your Mortgage Payment
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Principal and Interest
                </h3>
                <p className="text-gray-600">
                  This is the portion of your payment that goes toward paying
                  off the money you borrowed (principal) and the cost of
                  borrowing that money (interest).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Property Taxes</h3>
                <p className="text-gray-600">
                  Property taxes are assessed by local governments and used to
                  fund public services. They vary by location and are typically
                  paid as part of your monthly mortgage payment.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Home Insurance</h3>
                <p className="text-gray-600">
                  Homeowners insurance protects your home and belongings from
                  damage or loss. Mortgage lenders require you to have home
                  insurance as long as you have a mortgage.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">HOA Fees</h3>
                <p className="text-gray-600">
                  If your home is part of a homeowners association (HOA), you'll
                  pay fees that cover maintenance of common areas, amenities,
                  and sometimes utilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to take the next step?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get pre-approved and see what you qualify for with Better Mortgage.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Link href="/start" className="flex items-center">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
