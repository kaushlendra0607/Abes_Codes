#include<iostream>

using namespace std;


int n;
int arr[100];
int push(int *stack,int x,int n,int *top){
    if(*top == n-1){
        cout<<"Stack overflow";
    }else{
       top++;
        stack[*top] = x;
    }
    return *stack;
}

int main(){
    // int n;
    // cout<<"Enter max size of array :";
    // cin>>n;
    // int arr[n];
    string s = "K P SINGH";
    for(char a:s){
        cout<<a<<" ";
    }
    cout<<s.size();
    return 0;

}