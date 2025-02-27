"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Check, Home, Lock } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

// Form validation schemas
const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const signUpSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const loanPurposeSchema = z.object({
  purpose: z.enum(["purchase", "refinance"], {
    required_error: "Please select a loan purpose",
  }),
});

export default function StartPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loanPurpose, setLoanPurpose] = useState<
    "purchase" | "refinance" | null
  >(null);

  // Loan Purpose form
  const loanPurposeForm = useForm<z.infer<typeof loanPurposeSchema>>({
    resolver: zodResolver(loanPurposeSchema),
  });

  // Handle loan purpose selection directly
  const handleLoanPurposeSelect = (purpose: "purchase" | "refinance") => {
    setLoanPurpose(purpose);
    setCurrentStep(2);
  };

  // Add this function to handle form submission
  const handlePropertyDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Show success toast
    toast({
      title: "Application Submitted!",
      description: "We'll be in touch with you shortly.",
      duration: 5000,
    });

    // Redirect to mortgage calculator after a short delay
    setTimeout(() => {
      router.push("/mortgage-calculator");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span
              className={currentStep >= 1 ? "text-blue-600 font-medium" : ""}
            >
              Loan Purpose
            </span>
            <span
              className={currentStep >= 2 ? "text-blue-600 font-medium" : ""}
            >
              Property Details
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Step 1: Loan Purpose */}
          {currentStep === 1 && (
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">What's your goal?</CardTitle>
                  <CardDescription>
                    Tell us what you're looking to do
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Buy a Home Option */}
                    <button
                      onClick={() => handleLoanPurposeSelect("purchase")}
                      className={`w-full flex items-center justify-between p-4 border rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all ${
                        loanPurpose === "purchase"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center">
                        <Home className="h-6 w-6 text-blue-600 mr-3" />
                        <div className="text-left">
                          <p className="font-medium">Buy a home</p>
                          <p className="text-sm text-gray-500">
                            I want to purchase a new property
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex-shrink-0 ml-3 border rounded-full w-5 h-5 flex items-center justify-center ${
                          loanPurpose === "purchase"
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300"
                        }`}
                      >
                        {loanPurpose === "purchase" && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </button>

                    {/* Refinance Option */}
                    <button
                      onClick={() => handleLoanPurposeSelect("refinance")}
                      className={`w-full flex items-center justify-between p-4 border rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all ${
                        loanPurpose === "refinance"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center">
                        <Lock className="h-6 w-6 text-blue-600 mr-3" />
                        <div className="text-left">
                          <p className="font-medium">Refinance</p>
                          <p className="text-sm text-gray-500">
                            I want to refinance my current mortgage
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex-shrink-0 ml-3 border rounded-full w-5 h-5 flex items-center justify-center ${
                          loanPurpose === "refinance"
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300"
                        }`}
                      >
                        {loanPurpose === "refinance" && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Property Details */}
          {currentStep === 2 && (
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">
                    {loanPurpose === "purchase"
                      ? "Tell us about the home you want to buy"
                      : "Tell us about your current home"}
                  </CardTitle>
                  <CardDescription>
                    {loanPurpose === "purchase"
                      ? "Enter details about the property you're interested in"
                      : "Enter details about your current property"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handlePropertyDetailsSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Property Type</Label>
                      <select
                        id="propertyType"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select property type</option>
                        <option value="single-family">
                          Single Family Home
                        </option>
                        <option value="condo">Condominium</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="multi-family">Multi-Family Home</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        placeholder="e.g., 10001"
                        maxLength={5}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estimatedValue">
                        {loanPurpose === "purchase"
                          ? "Estimated Purchase Price"
                          : "Estimated Property Value"}
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <Input
                          id="estimatedValue"
                          className="pl-8"
                          placeholder="e.g., 350000"
                        />
                      </div>
                    </div>

                    {loanPurpose === "refinance" && (
                      <div className="space-y-2">
                        <Label htmlFor="currentMortgageBalance">
                          Current Mortgage Balance
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            $
                          </span>
                          <Input
                            id="currentMortgageBalance"
                            className="pl-8"
                            placeholder="e.g., 250000"
                          />
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                    >
                      Submit Application <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why choose Better?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've redesigned the mortgage process to be faster, more
              transparent, and totally online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No commission, no fees
              </h3>
              <p className="text-gray-600">
                Our loan officers don't work on commission, so they're focused
                on getting you the best loan, not the biggest.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Close faster
              </h3>
              <p className="text-gray-600">
                Our digital process is designed to help you close on your
                schedule, sometimes in as little as 14 days.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                100% online
              </h3>
              <p className="text-gray-600">
                Apply, lock your rate, and upload documents from anywhere, on
                your schedule.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
