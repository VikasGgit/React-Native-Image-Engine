import { useState, useEffect } from "react";
import { Button, Image, ScrollView, Text, TextInput, View } from "react-native";

export default function Index() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  const fetImage = () => {
    if (!keyword) return;
    const api = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=zvjs5qRefXAPsrUi7nr17VocgSpse2RWKn3NXJ3cdcI&per_page=12`;

    fetch(api)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        return response.json();
      })
      .then((result) => {
        setData(result.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetImage();
  }, [page]);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Unsplash Image Search
      </Text>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <TextInput
          placeholder="Enter keyword"
          style={{
            height: 40,
            width: "70%",
            paddingHorizontal: 10,
            fontSize: 16,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            backgroundColor: "#fff",
            marginRight: 10,
          }}
          onChangeText={(term) => setKeyword(term)}
        />
        <Button
          title="Search"
          onPress={() => {
            setPage(1);
            fetImage();
          }}
          color="#1e90ff"
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 5 }}>
        {data.length > 0 ? (
          data.map((item) => (
            <View
              key={item.id}
              style={{
                marginBottom: 20,
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
              }}
            >
              <Image
                source={{ uri: item.urls.small }}
                style={{
                  width: 300,
                  height: 200,
                  borderRadius: 8,
                }}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 14,
                  color: "#333",
                  textAlign: "center",
                }}
              >
                {item.alt_description || "No description available"}
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 50, color: "#888" }}>
            No images to display. Enter a keyword to search.
          </Text>
        )}
      </ScrollView>

      {data.length > 0 && (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Button
            title="Next Page"
            onPress={() => setPage((prevPage) => prevPage + 1)}
            color="#1e90ff"
          />
        </View>
      )}
    </View>
  );
}
