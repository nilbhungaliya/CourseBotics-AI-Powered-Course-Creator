export const storeDataInDatabase = async (id: string, userInput: any, data: any, user: any) => {
  try {
    const response = await fetch('/api/storeData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, userInput, data, user }),
    });

    if (!response.ok) {
      throw new Error(`Failed to store data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error storing data:', error);
    throw error;
  }
};
