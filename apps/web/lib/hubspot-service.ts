import { Client } from '@hubspot/api-client';
import { hubspotConfig } from '@/config/hubspot';

class HubspotService {
  private client: Client;

  constructor() {
    this.client = new Client({ accessToken: hubspotConfig.accessToken });
  }

  async getFormById(formId: string, archived?: boolean) {
    try {
      const apiResponse = await this.client.marketing.forms.formsApi.getById(formId, archived);
      return apiResponse;
    } catch (error: any) {
      if (error.message === 'HTTP request failed') {
        throw new Error(JSON.stringify(error.response));
      }
      throw error;
    }
  }
}

// Export a singleton instance
export const hubspotService = new HubspotService(); 