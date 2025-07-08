import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, FileText } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useDentistData } from "@/hooks/useDentistData"

const TermsOfService: React.FC = () => {
  const { slug } = useParams();
  const { dentist, loading } = useDentistData(slug);
  const homeUrl = slug ? `/${slug}` : "/";

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const companyName = dentist?.business_name || "Dental Practice Name";
  const address = dentist?.address || "123 Main Street";
  const city = "City, State ZIP";
  const phone = dentist?.phone || "(555) 123-4567";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center py-8 px-2">
      <Card className="w-full max-w-4xl shadow-2xl rounded-3xl animate-fade-in-up">
        <CardContent className="p-0">
          <div className="rounded-t-3xl bg-gradient-to-r from-primary to-blue-500 flex flex-col items-center py-8 mb-8">
            <FileText className="h-14 w-14 text-white mb-4" />
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Terms of Service</h1>
            <p className="text-blue-100 text-lg max-w-2xl text-center mb-2">
              Please read these terms carefully. By using {companyName}'s website and services, you agree to these terms.
            </p>
            <div className="flex items-center justify-center text-sm text-blue-200">
              <span>Last updated: 8 July 2025</span>
            </div>
          </div>
          <div className="px-6 pb-10 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2">1. Introduction</h2>
              <Separator className="mb-4" />
              <p className="text-muted-foreground leading-relaxed">
                Welcome to our dental practice. These Terms of Service govern your use of our website, services, and any related applications. By accessing or using our services, you agree to be bound by these Terms. Please read them carefully.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2">2. Definitions</h2>
              <Separator className="mb-4" />
              <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                <li><strong>"Services"</strong> refers to the dental care services provided by our practice.</li>
                <li><strong>"Website"</strong> refers to our online presence at [website address].</li>
                <li><strong>"User"</strong> refers to any individual who accesses or uses our services or website.</li>
                <li><strong>"Patient"</strong> refers to any individual who receives dental care from our practice.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2">3. Eligibility</h2>
              <Separator className="mb-4" />
              <p className="text-muted-foreground leading-relaxed">
                Our services are available to individuals who are at least 18 years of age or who have the legal consent of a parent or guardian. By using our services, you represent and warrant that you meet these eligibility requirements.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2">4. Appointment Scheduling</h2>
              <Separator className="mb-4" />
              <p className="text-muted-foreground leading-relaxed">
                Our website allows you to schedule appointments online. By scheduling an appointment, you agree to:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                <li>Provide accurate and complete information.</li>
                <li>Arrive on time for your scheduled appointment.</li>
                <li>Provide at least 24 hours' notice if you need to cancel or reschedule.</li>
                <li>Pay any applicable cancellation fees for late cancellations or no-shows.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2">5. Payment Terms</h2>
              <Separator className="mb-4" />
              <p className="text-muted-foreground leading-relaxed">
                Payment for our services is due at the time services are rendered, unless other arrangements have been made in advance. We accept various payment methods, including:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                <li>Major credit cards</li>
                <li>Cash</li>
                <li>Insurance (for covered services)</li>
                <li>Approved financing options</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You are responsible for any portion of the fees not covered by insurance. We will provide you with an estimate of costs before performing any procedures.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2">6. Privacy Policy</h2>
              <Separator className="mb-4" />
              <p className="text-muted-foreground leading-relaxed">
                Our Privacy Policy, which is incorporated into these Terms by reference, explains how we collect, use, and protect your personal information. By using our services, you consent to the data practices described in our Privacy Policy.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2">7. Intellectual Property</h2>
              <Separator className="mb-4" />
              <p className="text-muted-foreground leading-relaxed">
                All content on our website, including text, graphics, logos, images, and software, is the property of our practice or our content suppliers and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2">8. Limitation of Liability</h2>
              <Separator className="mb-4" />
              <p className="text-muted-foreground leading-relaxed">
                To the fullest extent permitted by law, our practice shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                <li>Your use or inability to use our services or website.</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
                <li>Any interruption or cessation of transmission to or from our website.</li>
                <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our website.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2">9. Changes to Terms</h2>
              <Separator className="mb-4" />
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting the updated Terms on our website. Your continued use of our services after such modifications constitutes your acceptance of the revised Terms.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2">10. Contact Information</h2>
              <Separator className="mb-4" />
              <div className="space-y-4 text-muted-foreground">
                <p>If you have any questions about these Terms, please contact us at:</p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-medium text-foreground">{companyName}</p>
                  <p className="text-muted-foreground">{address}</p>
                  <p className="text-muted-foreground">{city}</p>
                  <p className="text-muted-foreground">Phone: {phone}</p>
                </div>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
      <div className="fixed top-8 left-8">
        <Link 
          to={homeUrl} 
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors bg-white/80 px-4 py-2 rounded-full shadow"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default TermsOfService