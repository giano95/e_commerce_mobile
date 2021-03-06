import React, { Component, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Linking,  
  KeyboardAvoidingView,
  Form,
  TextInput,
  ImageField,
  Button,
  Keyboard,
  Alert,
  Picker,
  Dimensions,
  Modal,
  AsyncStorage
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

import {Icon, Header, Card} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class UpdateItem extends Component {

  constructor() {
    super();
    this.state = {
      resourcePath: {}, 
      resourcePath_1: {}, 
      resourcePath_2: {}, 
      resourcePath_3: {}, 
      title: null,
      description: null,
      price: null,
      color: null,
      category: null,
      XS: null,
      S: null,
      M: null,
      L: null,
      XL: null,
      XXL: null,
    };
  }

  static navigationOptions = {
    //Setting the header of the screen
    title: "Update item"
  };

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  async selectFile() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({ resourcePath: res });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }
  async selectFile_1() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({ resourcePath_1: res });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }
  async selectFile_2() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({ resourcePath_2: res });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }
  async selectFile_3() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({ resourcePath_3: res });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  async submit () {
  
      

    AsyncStorage.getItem("userData").then((res) => {
        let userData = JSON.parse(res);
        var data = new FormData();

        if (this.state.title != null)
          data.append('name', this.state.title);
        if (this.state.description != null)
          data.append('description', this.state.description);
        if (this.state.price != null)
          data.append('price', this.state.price);
        if (this.state.category != null)
          data.append('category', this.state.category);
        if (this.state.color != null)
          data.append('color', this.state.color);
        if (this.state.img != null) {
          data.append('img', {
            uri: this.state.resourcePath.uri, 
            name: this.state.resourcePath.name,
            type: this.state.resourcePath.type
          });
        }
        
        if(! this.isEmpty(this.state.resourcePath_1)){
            data.append('images_0', {
                uri: this.state.resourcePath_1.uri, 
                name: this.state.resourcePath_1.name,
                type: this.state.resourcePath_1.type
            });
        } 
        
        if(! this.isEmpty(this.state.resourcePath_2)){
            data.append('images_1', {
                uri: this.state.resourcePath_2.uri, 
                name: this.state.resourcePath_2.name,
                type: this.state.resourcePath_2.type
            });
        }

        if(! this.isEmpty(this.state.resourcePath_3)){
            data.append('images_2', {
                uri: this.state.resourcePath_3.uri, 
                name: this.state.resourcePath_3.name,
                type: this.state.resourcePath_3.type
            }) ;
        } 
        
        if (this.state.XS != null) {
          data.append('quantity_size_0.size', 1)
          data.append('quantity_size_0.quantity', this.state.XS)
        }
        if (this.state.S != null) {
          data.append('quantity_size_1.size', 2)
          data.append('quantity_size_1.quantity', this.state.S)
        }
        if (this.state.M != null) {
          data.append('quantity_size_2.size', 3)
          data.append('quantity_size_2.quantity', this.state.M)
        }
        if (this.state.L != null) {
          data.append('quantity_size_3.size', 4)
          data.append('quantity_size_3.quantity', this.state.L)
        }
        if (this.state.XL != null) {
          data.append('quantity_size_4.size', 5)
          data.append('quantity_size_4.quantity', this.state.XL)
        }
        if (this.state.XXL != null) {
          data.append('quantity_size_5.size', 6)
          data.append('quantity_size_5.quantity', this.state.XXL)
        }
          
        console.log(data._parts)
        console.log(this.props.item.id)
      axios
      .put("http://192.168.1.39:8000/item/api/update/" + this.props.item.id + "/", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Token ' + userData.token
        }
      })
      .then(response => { console.log(response); Alert.alert("Item modificato con successo!"); Actions.host()})
      .catch(err => { console.log("fetch error " + err); })
     
    })  
  }


render() {
    return (
      <ScrollView style={{}}>
        <View style={{ marginTop: 15, justifyContent:"center", alignItems:"center"}}>
            <TextInput
              placeholder="Title"
              returnKeyType={'done'}
              autoCapitalize={'none'}
              autoCorrect={false}      
              style={{width: DEVICE_WIDTH - 30}}            
              placeholderTextColor="black"
              underlineColorAndroid="black"
              onChangeText={(text) => this.setState({title: text})}
            />
        </View>
        <Text style={{ marginTop: 25, marginLeft: 16}}>Description:</Text>
        <View style={{ marginTop: 5, justifyContent:"center", alignItems:"center"}}>
            <TextInput
                returnKeyType={'done'}
                autoCapitalize={'none'}
                autoCorrect={false}
                style={{width: DEVICE_WIDTH - 30, borderWidth: 1, borderRadius: 8}}
                multiline
                numberOfLines={10}
                onChangeText={text => this.setState({description: text})}
            />
        </View>
        <Text style={{ marginTop: 25, marginLeft: 16}}>Price:</Text>
        <View style={{ marginTop: 5, justifyContent:"center", alignItems:"center" }}>
            <TextInput
              keyboardType = 'numeric'  
              style={{width: DEVICE_WIDTH - 30, borderWidth: 1, borderRadius: 8}}            
              onChangeText={(text) => this.setState({price: text})}
            />
        </View>
        
        {/* <Text style={{ marginTop: 25, marginLeft: 16}}>Color:</Text> */}
        <View style={{ marginTop: 25, justifyContent:"center", alignItems:"center"}}>
            <View style={{ borderWidth: 1, borderColor:"black", borderRadius: 8}}>
                <Picker selectedValue={this.state.color} style={{ height: 50, width: DEVICE_WIDTH - 30 }} onValueChange={(itemValue) => this.setState({color: itemValue})}>
                    <Picker.Item label="Choose a color" value="0" />
                    <Picker.Item label="white" value="1" />
                    <Picker.Item label="grey" value="2" />
                    <Picker.Item label="black" value="3" />
                    <Picker.Item label="green" value="4" />
                    <Picker.Item label="blue" value="5" />
                    <Picker.Item label="purple" value="6" />
                    <Picker.Item label="yellow" value="7" />
                    <Picker.Item label="indigo" value="8" />
                    <Picker.Item label="red" value="9" />
                    <Picker.Item label="orange" value="10" />
                </Picker>
            </View>
        </View>

        <View style={{ marginTop: 25, justifyContent:"center", alignItems:"center"}}>
            <View style={{ borderWidth: 1, borderColor:"black", borderRadius: 8}}>
                <Picker selectedValue={this.state.category} style={{ height: 50, width: DEVICE_WIDTH - 30 }} onValueChange={(itemValue) => this.setState({category: itemValue})}>
                    <Picker.Item label="Choose a category for your item" value="0" />
                    <Picker.Item label="Dresses" value="1" />
                    <Picker.Item label="Casual" value="2" />
                    <Picker.Item label="Jeans" value="3" />
                    <Picker.Item label="Fashion" value="4" />
                    <Picker.Item label="Vintage" value="5" />
                    <Picker.Item label="Shoes" value="6" />
                    <Picker.Item label="Accessories" value="7" />
                    <Picker.Item label="Jewelry" value="8" />
                </Picker>
            </View>
        </View>

        <View style={{ marginTop: 45, justifyContent:"center", alignItems:"center"}}> 
            <TouchableOpacity style={{ backgroundColor: "#1266f1", height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: DEVICE_WIDTH - 30 }} onPress={this.selectFile.bind(this)}>
              <Text  style={{textAlign: 'center', marginRight: 12, color:"white"}}>ADD MAIN PHOTO</Text>
              <Icon color="white" name="photo" type="font-awesome" />
            </TouchableOpacity>        
        </View>
        <Text style={{ marginLeft: 16, marginTop: 5 }}>Photo uploaded: {this.state.resourcePath.name}</Text> 

        <View style={{ marginTop: 35, justifyContent:"center", alignItems:"center"}}> 
            <TouchableOpacity style={{ backgroundColor: "#1266f1", height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: DEVICE_WIDTH - 30 }} onPress={this.selectFile_1.bind(this)}>
              <Text  style={{textAlign: 'center', marginRight: 12, color:"white"}}>ADD SECONDARY PHOTO</Text>
              <Icon color="white" name="photo" type="font-awesome" />
            </TouchableOpacity>        
        </View>
        <Text style={{ marginLeft: 16, marginTop: 5 }}>Photo uploaded: {this.state.resourcePath_1.name}</Text> 

        <View style={{ marginTop: 35, justifyContent:"center", alignItems:"center"}}> 
            <TouchableOpacity style={{ backgroundColor: "#1266f1", height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: DEVICE_WIDTH - 30 }} onPress={this.selectFile_2.bind(this)}>
              <Text  style={{textAlign: 'center', marginRight: 12, color:"white"}}>ADD SECONDARY PHOTO</Text>
              <Icon color="white" name="photo" type="font-awesome" />
            </TouchableOpacity>        
        </View>
        <Text style={{ marginLeft: 16, marginTop: 5 }}>Photo uploaded: {this.state.resourcePath_2.name}</Text> 

        <View style={{ marginTop: 35, justifyContent:"center", alignItems:"center"}}> 
            <TouchableOpacity style={{ backgroundColor: "#1266f1", height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: DEVICE_WIDTH - 30 }} onPress={this.selectFile_3.bind(this)}>
              <Text  style={{textAlign: 'center', marginRight: 12, color:"white"}}>ADD SECONDARY PHOTO</Text>
              <Icon color="white" name="photo" type="font-awesome" />
            </TouchableOpacity>        
        </View>
        <Text style={{ marginLeft: 16, marginTop: 5 }}>Photo uploaded: {this.state.resourcePath_3.name}</Text> 

        <View style={{ marginTop: 40, justifyContent:"center", alignItems:"center"}}>
            <View style={{ width: DEVICE_WIDTH - 30, flexDirection: "row", marginBottom: 5, }}>
                <Text>Select a quantity for size XS: </Text>
                <View style={{ width:"100%", flexShrink: 1, flexDirection:"row" }}>
                  <TextInput
                      value = {this.state.XS}
                      keyboardType = 'numeric'  
                      style={{ borderWidth: 1, borderRadius: 8, width:(DEVICE_WIDTH - 30)/4, marginLeft: "auto"}}            
                      onChangeText={(text) => this.setState({XS: text})}
                  />
                </View>
            </View>
            <View style={{ width: DEVICE_WIDTH - 30, flexDirection: "row", marginBottom: 5}}>
                <Text>Select a quantity for size S: </Text>
                <View style={{ width:"100%", flexShrink: 1, flexDirection:"row" }}>
                  <TextInput
                      value = {this.state.S}
                      keyboardType = 'numeric'  
                      style={{ borderWidth: 1, borderRadius: 8, width:(DEVICE_WIDTH - 30)/4,  marginLeft: "auto"}}            
                      onChangeText={(text) => this.setState({S: text})}
                  />
                </View>
            </View>
            <View style={{ width: DEVICE_WIDTH - 30, flexDirection: "row", marginBottom: 5}}>
                <Text>Select a quantity for size M: </Text>
                <View style={{ width:"100%", flexShrink: 1, flexDirection:"row" }}>
                  <TextInput
                      value = {this.state.M}
                      keyboardType = 'numeric'  
                      style={{ borderWidth: 1, borderRadius: 8, width:(DEVICE_WIDTH - 30)/4,  marginLeft: "auto"}}            
                      onChangeText={(text) => this.setState({M: text})}
                  />
                </View>
            </View>
            <View style={{ width: DEVICE_WIDTH - 30, flexDirection: "row", marginBottom: 5}}>
                <Text>Select a quantity for size L: </Text>
                <View style={{ width:"100%", flexShrink: 1, flexDirection:"row" }}>
                  <TextInput
                      value = {this.state.L}
                      keyboardType = 'numeric'  
                      style={{ borderWidth: 1, borderRadius: 8, width:(DEVICE_WIDTH - 30)/4,  marginLeft: "auto"}}            
                      onChangeText={(text) => this.setState({L: text})}
                  />
                </View>
            </View>
            <View style={{ width: DEVICE_WIDTH - 30, flexDirection: "row", marginBottom: 5}}>
                <Text>Select a quantity for size XL: </Text>
                <View style={{ width:"100%", flexShrink: 1, flexDirection:"row" }}>
                  <TextInput
                      value = {this.state.XL}
                      keyboardType = 'numeric'  
                      style={{ borderWidth: 1, borderRadius: 8, width:(DEVICE_WIDTH - 30)/4,  marginLeft: "auto"}}            
                      onChangeText={(text) => this.setState({XL: text})}
                  />
                </View>
            </View>
            <View style={{ width: DEVICE_WIDTH - 30, flexDirection: "row", marginBottom: 5}}>
                <Text>Select a quantity for size XXL: </Text>
                <View style={{ width:"100%", flexShrink: 1, flexDirection:"row" }}>
                  <TextInput
                      value = {this.state.XXL}
                      keyboardType = 'numeric'  
                      style={{ borderWidth: 1, borderRadius: 8, width:(DEVICE_WIDTH - 30)/4,  marginLeft: "auto"}}            
                      onChangeText={(text) => this.setState({XXL: text})}
                  />
                </View>
            </View>
        </View>
        
        <View style={{ marginTop: 25, justifyContent:"center", alignItems:"center", marginBottom: 30}}> 
            <TouchableOpacity style={{ backgroundColor: "#00d68f", height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: DEVICE_WIDTH - 30 }} onPress={() => setTimeout(() => {this.submit();},1000)}>
              <Text  style={{textAlign: 'center', marginRight: 12, color:"white"}}>Update Item</Text>
            </TouchableOpacity>               
        </View>        

      </ScrollView>
    );      
  }
}

const styles = StyleSheet.create({

});
