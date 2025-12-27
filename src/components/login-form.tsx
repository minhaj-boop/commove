// 'use client'

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Controller, useForm } from "react-hook-form"
// import * as z from "zod"
// import Link from "next/link"
// import { useState, useEffect, Suspense } from "react"
// import QuickRoleLogin from "@/components/quick-role-login"
// import { useRouter, useSearchParams } from "next/navigation"
// import { login } from "@/services/auth.service"
// import { AUTH_REDIRECT_URL } from "@/route"

// const formSchema = z.object({
//   email: z.email("Please enter a valid email address."),
//   password: z
//     .string()
//     .min(8, "Password must be at least 8 characters.")
// })

// function LoginFormContent({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [successMessage, setSuccessMessage] = useState<string | null>(null)

//   useEffect(() => {
//     const resetStatus = searchParams.get('reset')
//     const code = searchParams.get('code')
//     const error_description = searchParams.get('error_description')

//     if (resetStatus === 'success') {
//       setSuccessMessage('Password reset successful! You can now sign in with your new password.')
//     } else if (error_description) {
//       setError(decodeURIComponent(error_description.split("+").join(" ")))
//     } else if (code) {
//       setSuccessMessage('Successfully verified your email! You can now sign in.')
//     }
//   }, [searchParams])

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   async function onSubmit(data: z.infer<typeof formSchema>) {
//     setIsLoading(true)
//     setError(null)
//     setSuccessMessage(null)

//     try {
//       const res = await login({ email: data.email, password: data.password })
//       if (!res.success) throw Error(res.error)
//       router.push(AUTH_REDIRECT_URL)
//     } catch (error) {
//       setError((error as Error).message || 'Invalid email or password. Please try again.')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card className="max-w-sm mx-auto animate-fade-in w-full">
//         <CardHeader className="text-center">
//           <CardTitle className="text-xl">Welcome back</CardTitle>
//           <CardDescription>
//             Login with your Apple or Google account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <FieldGroup>
//               <Controller
//                 name="email"
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field data-invalid={fieldState.invalid}>
//                     <FieldLabel htmlFor={field.name}>Email</FieldLabel>
//                     <Input
//                       {...field}
//                       id={field.name}
//                       type="email"
//                       aria-invalid={fieldState.invalid}
//                       placeholder="Enter your Email"
//                     />
//                     {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//                   </Field>
//                 )}
//               />
//               <Controller
//                 name="password"
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field data-invalid={fieldState.invalid}>
//                     <div className="flex items-center">
//                       <FieldLabel htmlFor={field.name}>Password</FieldLabel>
//                       <Link
//                         href="/forgot-password"
//                         className="ml-auto text-sm underline-offset-4 hover:underline"
//                       >
//                         Forgot your password?
//                       </Link>
//                     </div>
//                     <Input
//                       {...field}
//                       id={field.name}
//                       type="password"
//                       aria-invalid={fieldState.invalid}
//                       placeholder="Enter your Password"
//                     />
//                     {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//                   </Field>
//                 )}
//               />

//               {successMessage && (
//                 <div className="rounded-md bg-green-500/7 border border-green-500/20 p-3 text-sm dark:text-green-400 text-green-600">
//                   {successMessage}
//                 </div>
//               )}

//               {error && (
//                 <div className="rounded-md bg-destructive/7 border border-destructive/20 p-3 text-sm text-destructive">
//                   {error}
//                 </div>
//               )}

//               <Field>
//                 <Button type="submit" className="w-full" disabled={isLoading}>
//                   {isLoading ? 'Signing in...' : 'Sign In'}
//                 </Button>
//                 <FieldDescription className="text-center">
//                   Don&apos;t have an account? <Link href='/signup'>Sign up</Link>
//                 </FieldDescription>
//               </Field>
//             </FieldGroup>
//           </form>
//         </CardContent>
//       </Card>
//       {/* Temporary: Quick login as different user roles */}
//       <QuickRoleLogin onSubmit={onSubmit} />
//     </div>
//   )
// }

// export function LoginForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   return (
//     <Suspense fallback={
//       <div className={cn("flex flex-col gap-6", className)}>
//         <Card>
//           <CardHeader className="text-center">
//             <CardTitle className="text-xl">Welcome back</CardTitle>
//             <CardDescription>
//               Login with your Apple or Google account
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <div className="h-4 bg-muted rounded animate-pulse" />
//                 <div className="h-10 bg-muted rounded animate-pulse" />
//               </div>
//               <div className="space-y-2">
//                 <div className="h-4 bg-muted rounded animate-pulse" />
//                 <div className="h-10 bg-muted rounded animate-pulse" />
//               </div>
//               <div className="h-10 bg-muted rounded animate-pulse" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     }>
//       <LoginFormContent className={className} {...props} />
//     </Suspense>
//   )
// }





// src/components/login-form.tsx

'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { login } from "@/services/auth.service"
import { AUTH_REDIRECT_URL } from "@/route"

const ROLES = [
  { value: "admin", label: "Admin" },
  { value: "goc", label: "GOC" },
  { value: "mt_office", label: "MT Officer" },
  { value: "adjutant", label: "Adjutant" },
  { value: "co", label: "Commanding Officer" },
  { value: "gso1", label: "GSO-1" },
  { value: "col_staff", label: "Colonel Staff" },
  { value: "mp_checkpost", label: "MP Checkpost" },
] as const

const UNITS = [
  { value: "1_signal", label: "1 Signal Battalion" },
  { value: "6_engineers", label: "6 Engineers Regiment" },
  { value: "25_bir", label: "25 Border Infantry Regiment" },
  { value: "22_bir", label: "22 Border Infantry Regiment" },
  { value: "34_eb", label: "34 Engineering Battalion" },
] as const

// Define roles that don't require a unit
const ROLES_WITHOUT_UNIT = ["admin", "goc"]

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.enum(ROLES.map(r => r.value) as [string, ...string[]], {
    errorMap: () => ({ message: "Please select a role" })
  }),
  unit: z.string().optional()
})
  // Dynamic validation based on selected role
  .refine((data) => {
    // If role is not admin, unit is required
    if (!ROLES_WITHOUT_UNIT.includes(data.role)) {
      return data.unit && data.unit.trim().length > 0
    }
    return true
  }, {
    message: "Please select a unit",
    path: ["unit"]
  })

function LoginFormContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [showDemoInfo, setShowDemoInfo] = useState(false)

  useEffect(() => {
    const resetStatus = searchParams.get('reset')
    const code = searchParams.get('code')
    const error_description = searchParams.get('error_description')

    if (resetStatus === 'success') {
      setSuccessMessage('Password reset successful! You can now sign in with your new password.')
    } else if (error_description) {
      setError(decodeURIComponent(error_description.split("+").join(" ")))
    } else if (code) {
      setSuccessMessage('Successfully verified your email! You can now sign in.')
    }
  }, [searchParams])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "mt_office",
      unit: "1_signal",
    },
  })

  // Watch role to conditionally show/hide unit field
  const selectedRole = form.watch("role")
  const showUnitField = !ROLES_WITHOUT_UNIT.includes(selectedRole)

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const res = await login({
        email: data.email,
        password: data.password
      })
      if (!res.success) throw Error(res.error)
      router.push(AUTH_REDIRECT_URL)
    } catch (error) {
      setError((error as Error).message || 'Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Demo credentials for testing
  const demoCredentials = [
    { role: "admin", email: "admin@example.com", password: "password123" },
    { role: "goc", email: "goc@example.com", password: "password123" },
    { role: "mt_office", email: "mtoffice@example.com", password: "password123" },
    { role: "adjutant", email: "adjutant@example.com", password: "password123" },
    { role: "co", email: "co@example.com", password: "password123" },
    { role: "gso1", email: "gso1@example.com", password: "password123" },
    { role: "col_staff", email: "colstaff@example.com", password: "password123" },
    { role: "mp_checkpost", email: "mpcheckpost@example.com", password: "password123" },
  ]

  const handleDemoLogin = (role: string) => {
    const credential = demoCredentials.find(c => c.role === role)
    if (credential) {
      form.setValue('email', credential.email)
      form.setValue('password', credential.password)
      form.setValue('role', credential.role as any)
      // Clear unit if admin
      if (role === 'admin') {
        form.setValue('unit', '')
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="max-w-md mx-auto animate-fade-in w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Military Movement System</CardTitle>
          <CardDescription className="text-base">
            Secure Login for Authorized Personnel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              {/* Email Field */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        Email Address
                      </div>
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your registered email"
                      className="h-12"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Role Selection */}
              <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Role
                      </div>
                    </FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        // Clear unit if admin is selected
                        if (value === 'admin') {
                          form.setValue('unit', '')
                        }
                      }}
                    >
                      <SelectTrigger id={field.name} className="h-12">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Unit Selection - Conditionally shown */}
              {showUnitField && (
                <Controller
                  name="unit"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Unit
                        </div>
                      </FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id={field.name} className="h-12">
                          <SelectValue placeholder="Select your unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {UNITS.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              )}

              {/* Password Field */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor={field.name}>
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Password
                        </div>
                      </FieldLabel>
                      <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                      className="h-12"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Demo Credentials Toggle */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowDemoInfo(!showDemoInfo)}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {showDemoInfo ? 'Hide Demo Credentials' : 'Show Demo Credentials'}
                </button>

                {showDemoInfo && (
                  <div className="mt-3 p-4 bg-muted/50 rounded-lg border">
                    <p className="text-sm font-medium mb-2">Demo Credentials:</p>
                    <div className="space-y-2">
                      {demoCredentials.map((cred) => (
                        <div key={cred.role} className="flex items-center justify-between text-sm">
                          <span className="font-medium">{ROLES.find(r => r.value === cred.role)?.label}:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{cred.email}</span>
                            <button
                              type="button"
                              onClick={() => handleDemoLogin(cred.role)}
                              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20"
                            >
                              Fill
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Selected Role & Unit Preview */}
              <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-medium text-sm">Login Details</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Role</p>
                    <p className="font-semibold">
                      {ROLES.find(r => r.value === selectedRole)?.label || 'Not selected'}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      {selectedRole === 'admin' ? 'Position' : 'Unit'}
                    </p>
                    <p className="font-semibold">
                      {selectedRole === 'admin'
                        ? 'System Administrator'
                        : UNITS.find(u => u.value === form.watch('unit'))?.label || 'Not selected'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Success/Error Messages */}
              {successMessage && (
                <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-green-600 dark:text-green-400">{successMessage}</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4">
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-destructive mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Sign In
                    </>
                  )}
                </Button>

                <div className="mt-4 pt-4 border-t text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link href="/signup" className="font-medium text-primary hover:underline">
                      Request access
                    </Link>
                  </p>
                </div>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <div className="max-w-md mx-auto text-center">
        <p className="text-xs text-muted-foreground">
          <svg className="inline-block h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          This system contains sensitive military information. Access is restricted to authorized personnel only.
        </p>
      </div>
    </div>
  )
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Suspense fallback={<LoginFormSkeleton />}>
      <LoginFormContent className={className} {...props} />
    </Suspense>
  )
}

function LoginFormSkeleton() {
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-muted rounded-lg animate-pulse" />
          </div>
          <div className="h-8 bg-muted rounded animate-pulse mx-auto w-48 mb-2" />
          <div className="h-4 bg-muted rounded animate-pulse mx-auto w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse w-24" />
                <div className="h-12 bg-muted rounded animate-pulse" />
              </div>
            ))}
            <div className="h-12 bg-muted rounded animate-pulse mt-4" />
            <div className="h-4 bg-muted rounded animate-pulse mx-auto w-48 mt-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}