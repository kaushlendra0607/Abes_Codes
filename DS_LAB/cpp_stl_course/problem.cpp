#include<bits/stdc++.h>
#include<iostream>
#include<vector>
#include<algorithm>
#include<string>
using namespace std;
int main(){
    // long long t;
    // // cout<<"enter no. t";
    // cin>> t;
    // long long n;
    // long long x;
    // for(long long i=0;i<t;i++){
    //     cout<<"enter n for t"<<i;
    // //     // cin>>n;
    // //     // vector<long long> arr;
    // //     // auto it = arr.begin();
    // //     // for(long long j=0;j<n;j++){
    // //     //     // cout<<"enter x for j"<<j;
    // //     //     cin>>x;
    // //     //     arr.push_back(x);
    // //     // }
    // //     // vector<long long> arr2(arr.size());
    // //     // auto max = max_element(arr.begin(),arr.end());
    // //     // auto min = min_element(arr.begin(),arr.end());
    // //     // partial_sum(arr.begin(),arr.end(),arr2.begin());
    // //     // long long product = accumulate(arr2.begin(),arr2.end(),1, multiplies<long long>());
    // //     // // cout<<product <<" this is product";
    // //     // if(product%*max==0 && product%*min==0){
    // //     //     cout<<product << " yes"<<endl;
    // //     // }else{
    // //     //     cout<<product << " no"<<endl;
    // //     // }
    // // }

    // int n,x;
    // int m;
    // cin>>n>>x;
    // vector<int> arr;
    // while(n>0){
    //     cin>>m;
    //     arr.push_back(m);
    //     n--;
    // }
    // replace(arr.begin(),arr.end(),x,x+1);
    // for(int z:arr){
    //     cout<<z<<" ";
    // }

    // int n1,n2;
    // int x;
    // vector<int> arr;
    // vector<int> arr1;
    // cin>>n1>>n2;
    // for(int i=0;i<n1;i++){
    //     cin>>x;
    //     arr.push_back(x);
    // }
    // for(int i=0;i<n2;i++){
    //     cin>>x;
    //     arr1.push_back(x);
    // }
    // vector<int> arr2(arr.size()+arr1.size());
    // if(is_sorted(arr.begin(),arr.end()) && is_sorted(arr1.begin(),arr1.end())){
    //     merge(arr.begin(),arr.end(),arr1.begin(),arr1.end(),arr2.begin());
    //     for(int i:arr2){
    //         cout<<i<<" ";
    //     }
    // } else{
    //     if(arr.size()>arr1.size()){
    //         reverse(arr.begin(),arr.end());
    //         for(int i:arr){
    //             cout<<i<<" ";
    //         }
    //     } else{
    //         reverse(arr1.begin(),arr1.end());
    //          for(int i:arr1){
    //             cout<<i <<" ";
    //         }
    //     }
    // }

    //revise this one
    // int t, n;
    // cin >> t; // Read the number of test cases
    // for (int i = 0; i < t; ++i) {
    //     cin >> n;
    //     vector<int> arr(n);
    //     for (int j = 0; j < n; ++j) {
    //         cin >> arr[j]; // Input the array elements
    //     }
    //     bool has_duplicate = false;
    //     for (int j = 0; j < n; ++j) {
    //         for(int k = j + 1; k < n; k++){
    //             if (arr[j] == arr[k]) {
    //                 has_duplicate = true;
    //                 break; // No need to continue checking if a duplicate is found
    //             }
    //         }
    //         if(has_duplicate) break;
    //     }
    //     if (has_duplicate) {
    //         cout << "YES" << endl;
    //     } else {
    //         cout << "NO" << endl;
    //     }
    // }

    // int n;
    // cin>>n;
    // vector<int> arr(n);
    // for(int i=0;i<n;i++) cin>>arr[i];
    // sort(arr.begin(),arr.end());
    // for(int i:arr) cout<<i<<" ";
    
    // int n,l,s,u;
    // cin>>n>>s>>l>>u;
    // vector<int> arr(n);
    // for(int i = 0;i<n;i++){
    //     cin>>arr[i];
    // }
    // bool present = binary_search(arr.begin(),arr.end(),s);
    // if(present){
    //     cout<<"YES"<<" ";
    // } else{
    //     cout<<"NO"<<" ";
    // }
    // cout<< *(lower_bound(arr.begin(),arr.end(),l))<<" ";
    // cout<< *(lower_bound(arr.begin(),arr.end(),u));
    
    int n;
    string finalPotion;
    string sample;
    cout<<"Enter n: ";
    cin>>n;
    vector<string> arr(n);
    vector<string> elements;
    vector<string> elementsIng;
    vector<string> specialElementsIng;
    vector<int> index;
    vector<int> potionIndex;
    for(int i=0;i<n;i++) {
        cout<<" Enter "<<i<<" th element: ";
        cin>>arr[i];
    }
    for(const string &str:arr){
        string part;
        stringstream ss(str);
        while(getline(ss,part,'=')){
            elements.push_back(part);
        }
    }
    int sele = elements.size();
    for(int i=0;i<sele/2;i++){
        string part;
        stringstream ss(elements[2*i+1]);
        while(getline(ss,part,'+')){
            elementsIng.push_back(part);
        }
    }
    cout<<"enter finla potion :";
    cin>>finalPotion;
    int sIng = elementsIng.size();
    for(int i=0;i<sele;i++){
        if(finalPotion == elements[i]){
            index.push_back(i);
        }
    }
    for(auto &i:index){
        string part;
        stringstream ss(elements[i+1]);
        while(getline(ss,part,'+')){
            specialElementsIng.push_back(part);
        }
    }
    for(int i=0;i<sele/2;i++){
        for(auto &j:specialElementsIng){
            if(j == elements[2*i]){
                potionIndex.push_back(2*i);
            }
        }
    }
    int potionCount,ingCount;
    

    for(auto &i:elementsIng){
        cout<<i<<endl;
    }
    for(auto &i:elements){
        cout<<i<<endl;
    }
    for(auto &i:index){
        cout<<" this is index "<<i<<endl;
    }
    for(auto &i:specialElementsIng){
        cout<<"this is special "<<i<<endl;
    }
    for(auto &i:potionIndex){
        cout<<"this is special index "<<i<<endl;
    }

    

    
    return 0;
}
