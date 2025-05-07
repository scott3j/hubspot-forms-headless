import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@workspace/ui/components/sidebar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { HubspotFormJson } from "./hubspot-form-json";
import { HubspotFormSubmitJson } from "./hubspot-form-submit-json";
import { HubspotFormSubmitResponseJson } from "./hubspot-form-submit-response-json";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  submissionData?: {
    formId: string;
    fields: Record<string, string>;
    pageUrl?: string;
    pageName?: string;
  } | null;
  submissionResponse: {
    success: boolean;
    data?: any;
    error?: string;
  } | null;
}

export function AppSidebar({
  submissionData,
  submissionResponse,
  ...props
}: AppSidebarProps) {
  return (
    <Tabs defaultValue="hubspot-form">
      <Sidebar variant="floating" {...props}>
        <TabsList>
          <TabsTrigger value="hubspot-form">Hubspot Form</TabsTrigger>
          <TabsTrigger value="hubspot-form-submit-json">
            Hubspot Form Submit JSON
          </TabsTrigger>
          <TabsTrigger value="hubspot-form-submit-response">
            Hubspot Form Submit Response
          </TabsTrigger>
        </TabsList>

        <SidebarContent>
          <SidebarGroup>
            <TabsContent value="hubspot-form">
              <HubspotFormJson formId="22171cf5-8e39-4543-9e41-faab7d0c5c92" />
            </TabsContent>
            <TabsContent value="hubspot-form-submit-json" className="h-full">
              {submissionData ? (
                <HubspotFormSubmitJson
                  formId={submissionData.formId}
                  fields={submissionData.fields}
                  pageUrl={submissionData.pageUrl}
                  pageName={submissionData.pageName}
                />
              ) : (
                <div className="p-4 text-muted-foreground">
                  No submission data available
                </div>
              )}
            </TabsContent>
            <TabsContent
              value="hubspot-form-submit-response"
              className="h-full"
            >
              <HubspotFormSubmitResponseJson response={submissionResponse} />
            </TabsContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Tabs>
  );
}
