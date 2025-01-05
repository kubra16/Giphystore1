import React from 'react';
import { View, Modal, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

const GifModal = ({ selectedGif, modalVisible, setModalVisible }) => {
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [permissionStatus, setPermissionStatus] = React.useState(null);

    React.useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        setPermissionStatus(status);
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Please enable storage permissions in settings.');
        }
    };

    const handleDownload = async () => {
        if (!selectedGif) return Alert.alert('Error', 'No GIF selected for download.');

        try {
            if (permissionStatus !== 'granted') {
                const { status } = await MediaLibrary.requestPermissionsAsync();
                if (status !== 'granted') {
                    return Alert.alert('Permission Denied', 'Please allow media storage access.');
                }
                setPermissionStatus(status);
            }

            const fileUri = `${FileSystem.cacheDirectory}${selectedGif.id}.gif`;
            const { uri } = await FileSystem.downloadAsync(selectedGif.images.fixed_height.url, fileUri);

            await MediaLibrary.saveToLibraryAsync(uri);
            Alert.alert('Success', 'Download complete! GIF saved to gallery.');
        } catch (error) {
            console.error('Download error:', error);
            Alert.alert('Error', 'Failed to download GIF.');
        }
    };

    const handleShare = async () => {
        if (!selectedGif) return Alert.alert('Error', 'No GIF selected for sharing.');

        try {
            const fileUri = `${FileSystem.cacheDirectory}${selectedGif.id}.gif`;
            const { uri } = await FileSystem.downloadAsync(selectedGif.images.fixed_height.url, fileUri);

            if (!(await Sharing.isAvailableAsync())) {
                return Alert.alert('Sharing Not Supported', 'Sharing is not available on this device.');
            }

            await Sharing.shareAsync(uri);
        } catch (error) {
            console.error('Sharing error:', error);
            Alert.alert('Error', 'Failed to share GIF.');
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <View style={styles.centeredView}>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <MaterialIcons name="close" size={28} color="white" />
                </TouchableOpacity>

                {selectedGif ? (
                    <>
                        {selectedGif.images.fixed_height.mp4 ? (
                            <Video
                                source={{ uri: selectedGif.images.fixed_height.mp4 }}
                                style={styles.video}
                                isLooping
                                shouldPlay={isPlaying}
                                resizeMode={ResizeMode.CONTAIN}
                                useNativeControls
                            />
                        ) : (
                            <Image source={{ uri: selectedGif.images.fixed_height.url }} style={styles.modalImage} />
                        )}

                        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                            <MaterialIcons name="file-download" size={28} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                            <MaterialIcons name="share" size={28} color="white" />
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text style={styles.modalText}>Loading...</Text>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10,
    },
    downloadButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        padding: 10,
    },
    shareButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        padding: 10,
    },
    modalImage: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
    video: {
        width: 300,
        height: 300,
    },
    modalText: {
        color: 'white',
        fontSize: 18,
    },
});

export default GifModal;
