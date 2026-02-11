import * as Font from 'expo-font';

export const loadFonts = async () => {
  try {
    await Font.loadAsync({
      'Nunito-Regular': 'https://fonts.googleapis.com/css2?family=Nunito:wght@400&display=swap',
      'Nunito-SemiBold': 'https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap',
      'Nunito-Bold': 'https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap',
    });
    console.log('Nunito fonts loaded successfully');
  } catch (error) {
    console.log('Using system fonts instead of Nunito');
  }
};