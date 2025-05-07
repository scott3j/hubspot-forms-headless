"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { HubspotFormJson } from "@/components/hubspot-form-json";
import { HubspotForm } from "@/components/hubspot-form";
import { SidebarRight } from "@/components/sidebar-right";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";

export default function Page() {
  const [submissionData, setSubmissionData] = useState<{
    formId: string;
    fields: Record<string, string>;
    pageUrl?: string;
    pageName?: string;
  } | null>(null);
  const [submissionResponse, setSubmissionResponse] = useState<{
    success: boolean;
    data?: any;
    error?: string;
  } | null>(null);

  const handleFormSubmit = (data: {
    formId: string;
    fields: Record<string, string>;
    pageUrl?: string;
    pageName?: string;
  }) => {
    setSubmissionData(data);
  };

  const handleFormResponse = (response: {
    success: boolean;
    data?: any;
    error?: string;
  }) => {
    setSubmissionResponse(response);
  };

  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="flex items-center justify-center min-h-svh ">
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <HubspotForm
              formId="22171cf5-8e39-4543-9e41-faab7d0c5c92"
              onSubmissionData={handleFormSubmit}
              onSubmissionResponse={handleFormResponse}
            />
            <div />
          </div>
        </div>
      </SidebarInset>
      <SidebarRight
        submissionData={submissionData}
        submissionResponse={submissionResponse}
      />
    </SidebarProvider>
  );
}
