import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, FileText } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDentistData } from "@/hooks/useDentistData";

interface PrivacyPolicyProps {
  companyName?: string;
  lastUpdated?: string;
  phone?: string;
  address?: string;
}

export function PrivacyPolicy({
  companyName = "Dental Care Clinic",
  lastUpdated = "January 15, 2024",
  phone = "(555) 123-4567",
  address = "123 Dental Street, Suite 100, Anytown, USA 12345",
}: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center py-8 px-2">
      <Card className="w-full max-w-4xl shadow-2xl rounded-3xl animate-fade-in-up">
        <CardContent className="p-0">
          <div className="rounded-t-3xl bg-gradient-to-r from-primary to-blue-500 flex flex-col items-center py-8 mb-8">
            <Shield className="h-14 w-14 text-white mb-4" />
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Privacy Policy</h1>
            <p className="text-blue-100 text-lg max-w-2xl text-center mb-2">
              At {companyName}, we value your privacy and are committed to protecting your personal information.
            </p>
            <div className="flex items-center justify-center text-sm text-blue-200">
              <FileText className="h-4 w-4 mr-2" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
          <div className="px-6 pb-10 space-y-10">
            {/* Sections */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2 flex items-center"><Shield className="h-6 w-6 mr-2 text-primary" /> Information We Collect</h2>
              <Separator className="mb-4" />
              <div className="space-y-4 text-muted-foreground">
                <p>We collect personal information that you voluntarily provide to us when you:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Register on our website</li>
                  <li>Schedule an appointment</li>
                  <li>Fill out a form</li>
                  <li>Sign up for our newsletter</li>
                  <li>Contact us via email, phone, or other communication channels</li>
                </ul>
                <p>The personal information we may collect includes your name, phone number, mailing address, and any other information you choose to provide.</p>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2 flex items-center"><Lock className="h-6 w-6 mr-2 text-primary" /> How We Use Your Information</h2>
              <Separator className="mb-4" />
              <div className="space-y-4 text-muted-foreground">
                <p>We use the information we collect for various purposes, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Providing, operating, and maintaining our website</li>
                  <li>Scheduling and managing your dental appointments</li>
                  <li>Sending you appointment reminders</li>
                  <li>Improving, personalizing, and expanding our website</li>
                  <li>Understanding and analyzing how you use our website</li>
                  <li>Developing new products, services, features, and functionality</li>
                  <li>Communicating with you about promotions, updates, and other information</li>
                  <li>Processing your transactions</li>
                  <li>Finding and preventing fraud</li>
                </ul>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2 flex items-center"><FileText className="h-6 w-6 mr-2 text-primary" /> Information Sharing and Disclosure</h2>
              <Separator className="mb-4" />
              <div className="space-y-4 text-muted-foreground">
                <p>We may share your personal information in the following situations:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>With Service Providers:</strong> We may share your information with service providers who perform services for us or on our behalf.</li>
                  <li><strong>For Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                  <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
                  <li><strong>With Affiliates:</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy.</li>
                  <li><strong>With Business Partners:</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
                </ul>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2 flex items-center"><Shield className="h-6 w-6 mr-2 text-primary" /> Your Privacy Rights</h2>
              <Separator className="mb-4" />
              <div className="space-y-4 text-muted-foreground">
                <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The right to access the personal information we have about you</li>
                  <li>The right to request that we correct any inaccurate personal information we have about you</li>
                  <li>The right to request that we delete any personal information we have about you</li>
                  <li>The right to opt-out of marketing communications</li>
                  <li>The right to withdraw consent at any time, where we rely on your consent to process your personal information</li>
                </ul>
                <p>To exercise these rights, please contact us using the information provided at the end of this Privacy Policy.</p>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2 flex items-center"><Lock className="h-6 w-6 mr-2 text-primary" /> Data Security</h2>
              <Separator className="mb-4" />
              <div className="space-y-4 text-muted-foreground">
                <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>
                <p>We will do our best to protect your personal information, but transmission of personal information to and from our website is at your own risk. You should only access the website within a secure environment.</p>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2 flex items-center"><FileText className="h-6 w-6 mr-2 text-primary" /> Contact Us</h2>
              <Separator className="mb-4" />
              <div className="space-y-4 text-muted-foreground">
                <p>If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:</p>
                <div className="bg-muted p-4 rounded-md">
                  <p className="font-medium text-foreground">{companyName}</p>
                  <p>Phone: {phone}</p>
                  <p>Address: {address}</p>
                </div>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  const { slug } = useParams();
  const { dentist, loading } = useDentistData(slug);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const companyName = dentist?.business_name || "Dental Care Clinic";
  const address = dentist?.address || "123 Dental Street, Suite 100, Anytown, USA 12345";
  const phone = dentist?.phone || "(555) 123-4567";

  return (
    <PrivacyPolicy 
      companyName={companyName} 
      lastUpdated="March 1, 2024" 
      phone={phone}
      address={address}
    />
  );
}