#include<iostream>

using namespace std;


int top = -1;
char arr[100];
void push(char value){
    if(top>=99){
        cout<<"Overflow\n";
        return;
    }
    top++;
    arr[top] = value;
}

int pop(){
    if(top<0){
        cout<<"Underflow\n";
        return -1;
    }
    char a;
    a = arr[top];
    top--;
    return a;
}

bool isEmpty() {
    return top == -1;
}

bool isFull() {
    return top == 99;
}
int main(){
    int n;
    int x;
    char c;
    cout<<"Enter the no. of bracket elements shouldn't be greater than 100 :";
    cin>>n;
    for(int i=0;i<n;i++){
        cin>>c;
        push(c);
    }
}