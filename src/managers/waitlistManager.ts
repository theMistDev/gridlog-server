import WaitListModel, {
  WaitListInterface,
} from '../models/waitlist/waitlistModel';
import WaitListDumpModel, {
  WaitListDumpInterface,
} from '../models/waitlist/waitlistDumpModel';

export class WaitListManager {
  getCount = async () => {
    try {
      const count: number = await WaitListModel.countDocuments().lean();
      const count2: number = await WaitListDumpModel.countDocuments().lean();
      if (!count || !count2) {
        return {
          success: false,
          message: 'Count not fetched',
          data: 0,
        };
      } else {
        console.log(count + count2);
        return {
          success: true,
          message: 'Count fetch successful',
          data: count + count2,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Error: ${error}`,
        data: 0,
      };
    }
  };

  addToWaitListManager = async (email: string, name: string) => {
    try {
      const newDocument = new WaitListModel({ email, name });
      await newDocument.save();
      console.log('Document saved:', newDocument);
      if (!newDocument) {
        return {
          success: false,
          message: 'Waitlist user not aded',
          data: {},
        };
      } else {
        return {
          success: true,
          message: 'new waitlist user added',
          data: newDocument,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Error: ${error}`,
        data: {},
      };
    }
  };

  searchManager = async (query: string) => {
    try {
      async function searchModels(
        query: string
      ): Promise<Array<WaitListDumpInterface | WaitListInterface>> {
        const searchRegex = new RegExp(query, 'i'); // Case-insensitive regex for the search query

        const results: Array<WaitListDumpInterface | WaitListInterface> = [];

        // Search in Model1
        const waitlistDumpResults = await WaitListDumpModel.find({
          $or: [
            {
              Email_ID: { $regex: searchRegex },
            },
            // Add other fields as needed
          ],
        });

        // Search in Model2
        const waitlistResults = await WaitListModel.find({
          $or: [
            {
              email: { $regex: searchRegex },
            },
            {
              name: { $regex: searchRegex },
            },
            // Add other fields as needed
          ],
        });

        results.push(...waitlistDumpResults, ...waitlistResults);

        return results;
      }

      const searchResponse = await searchModels(query);

      if (!searchResponse) {
        return {
          success: false,
          message: 'Count not fetched',
          data: '',
        };
      } else {
        return {
          success: true,
          message: 'query fetch successful',
          data: searchResponse,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Error: ${error}`,
        data: error,
      };
    }
  };
}
