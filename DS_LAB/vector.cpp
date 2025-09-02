#include<iostream>
#include<vector>
using namespace std;
main(){//to find total no. of elements in a vector we use funcn size()
    vector<int> num = {1,2,3,4,5};
    for (int i = 0; i < num.size(); i++)
    {
        /* code */cout<<num.at(i)<<"\n";//at takes the index directly
    }
    //to acces the first and last value of a vector we use front and back
    cout<<num.front()<<"\n";
    num.push_back(6);
    cout<<num.back()<<endl;//endl is complement of "\n"

    for (int i = 0; i < num.size(); i++)
    {
        /* code */cout<<num.at(i)<<"\n";//at takes the index directly
    }
    num.pop_back();
    for (int i = 0; i < num.size(); i++)
    {
        /* code */cout<<num.at(i)<<"\n";//at takes the index directly
    }
    //empty funcn is used to check if a vector is empty, it returns only 0 or 1
    //0 when not empty 1 when empty
    cout<<num.empty()<<endl;
    for(int var:num){//this syntax behaves like foreach
        cout<<var<<'\n';
    };
    vector<int> num1;//assign funcn assigns the values of a vector to another vector
    num1.assign(num.begin(),num.end());//begin and end point towards the first and last elements of the vector
    for(int var:num1){//this syntax behaves like foreach
        cout<<var<<'\n';
    };
    num1.assign(3,7);//this replicates 7 three times in num1
    for(int var:num1){//this syntax behaves like foreach
        cout<<var<<'\n';
    };
    //clear funcn clears the vector completely means it makes it empty it doesnt delets the vector

    num.swap(num1);
}