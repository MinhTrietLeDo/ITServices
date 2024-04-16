{status === 6 ? (
    <View style={styles.row}>
      <Text
        style={{
          fontSize: windowWidth * 0.05,
          fontWeight: 700,
        }}>
        Đánh giá:
      </Text>
      <Text
        style={{
          fontSize: windowWidth * 0.045,
          fontWeight: 400,
          marginLeft: windowWidth * 0.01,
        }}>
        {reqLocation}
      </Text>
    </View>
  ) : null}