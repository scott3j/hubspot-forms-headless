import * as React from "react";
import { Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@workspace/ui/components/sidebar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { HubspotFormJson } from "./hubspot-form-json";
import { HubspotFormSubmitJson } from "./hubspot-form-submit-json";
import { HubspotFormSubmitResponseJson } from "./hubspot-form-submit-response-json";

interface SidebarRightProps extends React.ComponentProps<typeof Sidebar> {
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

export function SidebarRight({
  submissionData,
  submissionResponse,
  ...props
}: SidebarRightProps) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh w-[400px] pt-4"
      {...props}
    >
      <div className="flex flex-col h-full p-2 w-full">
        <Tabs
          defaultValue="hubspot-form-fields"
          className="w-full flex flex-col flex-1"
        >
          <TabsList className="flex-none">
            <TabsTrigger value="hubspot-form-fields">Hubspot Form</TabsTrigger>
            <TabsTrigger value="hubspot-form-submit">
              Submission Data
            </TabsTrigger>
            <TabsTrigger value="hubspot-form-response">
              Form Response
            </TabsTrigger>
          </TabsList>
          <ScrollArea className="flex-1">
            <div className="w-full">
              <TabsContent value="hubspot-form-fields" className="h-full">
                <HubspotFormJson formId="22171cf5-8e39-4543-9e41-faab7d0c5c92" />
              </TabsContent>
              <TabsContent value="hubspot-form-submit" className="h-full">
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
              <TabsContent value="hubspot-form-response" className="h-full">
                <HubspotFormSubmitResponseJson response={submissionResponse} />
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>

        <SidebarContent className="flex-none">
          <SidebarSeparator className="mx-0" />
        </SidebarContent>
        <SidebarFooter className="flex-none">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton></SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
