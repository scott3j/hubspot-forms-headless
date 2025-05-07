"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { HubspotForm } from "@/components/hubspot-form";

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
    <SidebarProvider
      style={
        {
          "--sidebar-width": "46rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        submissionData={submissionData}
        submissionResponse={submissionResponse}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="p-4">
              <h1 className="text-2xl font-bold">
                <HubspotForm
                  formId="22171cf5-8e39-4543-9e41-faab7d0c5c92"
                  onSubmissionData={handleFormSubmit}
                  onSubmissionResponse={handleFormResponse}
                />
              </h1>
            </div>
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
