import { useNavigation } from '@react-navigation/native';
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from './firebaseConfig';

const generateRandomUsername = () => {
  const adjectives = ['Happy', 'Sad', 'Angry', 'Silly', 'Clever', 'Lucky', 'Shy', 'Funny'];
  const nouns = ['Cat', 'Dog', 'Bird', 'Elephant', 'Monkey', 'Tiger', 'Lion', 'Penguin'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}${randomNoun}`;
};

const getDeviceId = () => {
  // Replace this with your actual logic to obtain the device ID
  // For demonstration purposes, returning a constant string
  return 'sampleDeviceId';
};

const CommunityPage = () => {
  const [review, setReview] = useState('');
  const [reviewsList, setReviewsList] = useState([]);
  const [likedReviews, setLikedReviews] = useState([]);
  const [dislikedReviews, setDislikedReviews] = useState([]);
  const [deviceId, setDeviceId] = useState(null);
  const navigation = useNavigation();

  const fetchReviews = async () => {
    try {
      const username = generateRandomUsername();
     const querySnapshot = await getDocs(collection(db, 'reviews'));
const reviews = [];
querySnapshot.forEach((doc) => {
  const data = doc.data();
  reviews.push({
    id: doc.id,
    text: data.text,
    username: data.username,
    timestamp: data.timestamp, // Ensure this line is correct
    likes: data.likes || [],
    dislikes: data.dislikes || []
  });
});

      setReviewsList(reviews);
      const likedReviews = reviews.filter((review) => review.likes.includes(username)).map((review) => review.id);
      const dislikedReviews = reviews.filter((review) => review.dislikes.includes(username)).map((review) => review.id);
      setLikedReviews(likedReviews);
      setDislikedReviews(dislikedReviews);
    } catch (error) {
      console.error('Error fetching reviews: ', error);
    }
  };

  const handleLike = async (reviewId) => {
    try {
      const reviewRef = doc(db, 'reviews', reviewId);
      const userLiked = likedReviews.includes(reviewId);

      if (userLiked) {
        await updateDoc(reviewRef, {
          likes: arrayRemove(deviceId),
        });
      } else {
        await updateDoc(reviewRef, {
          likes: arrayUnion(deviceId),
          dislikes: arrayRemove(deviceId),
        });
      }

      fetchReviews();
    } catch (error) {
      console.error('Error toggling like: ', error);
    }
  };

  const handleDislike = async (reviewId) => {
    try {
      const reviewRef = doc(db, 'reviews', reviewId);
      const userDisliked = dislikedReviews.includes(reviewId);

      if (userDisliked) {
        await updateDoc(reviewRef, {
          dislikes: arrayRemove(deviceId),
        });
      } else {
        await updateDoc(reviewRef, {
          dislikes: arrayUnion(deviceId),
          likes: arrayRemove(deviceId),
        });
      }

      fetchReviews();
    } catch (error) {
      console.error('Error toggling dislike: ', error);
    }
  };

  const handleSubmit = async () => {
    if (review.trim() !== '') {
      const username = generateRandomUsername();

      try {
    const docRef = await addDoc(collection(db, 'reviews'), {
  text: review,
  username,
  timestamp: serverTimestamp(),
  likes: [],
  dislikes: []
});


        setReviewsList((prevReviews) => [
          ...prevReviews,
          {
            text: review,
            username,
            id: docRef.id,
            likes: [],
            dislikes: [],
          },
        ]);

        setReview('');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  useEffect(() => {
    const deviceIdFromFunction = getDeviceId();
    setDeviceId(deviceIdFromFunction);
    fetchReviews();
  }, []);

  return (
    <ImageBackground source={require('../assets/restpage.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
      <TouchableOpacity
  onPress={() => navigation.goBack()}
  style={{
    position: 'absolute',
    top: -3,
    right: 200,
    padding: 15,
  }}
>
  <Icon name="arrow-back" size={24} color="black" />
</TouchableOpacity>

          <Text style={styles.headerText}>Community</Text>
        </View>
        <TextInput
          style={{
            height: 50,
            top: 10,
            borderWidth: 1,
            margin: 90,
            width: '70%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            paddingLeft: 20,
            color: 'black',
          }}
          onChangeText={(text) => setReview(text)}
          value={review}
          placeholder="  Write your review here"
          placeholderTextColor="gray"
          multiline
          testID="reviewTextInput"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
        <FlatList
  contentContainerStyle={{
    width: '115%',
    paddingLeft: 78,
  }}
  data={reviewsList}
  renderItem={({ item }) => (
  <View style={{ borderWidth: 1, justifyContent: 'center', borderColor: 'gray', alignItems: 'left', padding: 8, margin: 10, width: '80%', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
  <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
  <Text>{item.text}</Text>
  <Text style={{ fontStyle: 'italic', color: 'gray' }}>
  {console.log('Timestamp:', item.timestamp)}
  Published on: {item.timestamp ? item.timestamp.toDate() ? item.timestamp.toDate().toLocaleString() : 'N/A' : 'N/A'}
</Text>

  <TouchableOpacity onPress={() => handleLike(item.id)}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon name="thumb-up" size={20} color={likedReviews.includes(item.id) ? 'blue' : 'black'} />
      <Text style={{ marginLeft: 5 }}>{item.likes.length}</Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => handleDislike(item.id)}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon name="thumb-down" size={20} color={dislikedReviews.includes(item.id) ? 'red' : 'black'} />
      <Text style={{ marginLeft: 5 }}>{item.dislikes.length}</Text>
    </View>
  </TouchableOpacity>
</View>

  )}
  keyExtractor={(item) => item.id.toString()}
/>


        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '150%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    bottom: 30,
    right: 9,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100',
    padding: 10,
    position: 'absolute',
    top: 40,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CommunityPage;