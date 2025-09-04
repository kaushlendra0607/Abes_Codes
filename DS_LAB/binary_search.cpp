#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

int main(){
    vector<int> arr = {1,4,56,888,2,72};
    int beg;
    int end;
    int mid;
    // while(mid<=end){
    //     mid = (beg+end)/2;
    //     if(arr[mid] == item)
    // }
    sort(arr.begin(),arr.end()); 
    if(binary_search(arr.begin(),arr.end(),888)){
        cout<<"element found";
    }else{
        cout<<"Element not found";
    }
}