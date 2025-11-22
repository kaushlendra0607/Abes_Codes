
#include<stdio.h>

void insertionSort(int arr[], int n) {
    int i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

void selection_sort(int arr[],int n){
    int min = arr[0],temp;
    for(int i=0;i<n;i++){
        for(int j=i;j<n;j++){
            if(arr[j]<min){
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            min = arr[i];
        }
    }
}

void bubble_sort(int arr[],int n){
    for(int i=0;i<n;i++){
        int swapped = 0,temp;
        for(int j=0;j<n-i-1;j++){
            if(arr[j]>arr[j+1]){
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1]=temp;
                // swap(arr[j],arr[j+1]);
                swapped = 1;
            }
        }
        if(swapped == 0)
        break;
    }
}

void merge(int arr[], int left,int mid, int right){
    int n1 = mid-left+1;
    int n2 = right - mid;
    int L[n1],R[n2];
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}
void mergeSort(int arr[], int left, int right) {
    int a = right;
    if (left >= right)
        return;

    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for(int j = low; j < high; j++) {
        if(arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }

    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void quicksort(int arr[], int low, int high) {
    if(low < high) {
        int pi = partition(arr, low, high);

        quicksort(arr, low, pi - 1);
        quicksort(arr, pi + 1, high);
    }
}

int main(){
    int n;
    printf("Enter size of array: ");
    scanf("%d",&n);
    int arr[n];
    for(int i=0;i<n;i++){
        printf("Enter %dth element: ",i+1);
        scanf("%d",&arr[i]);
    }
    int choice;
    printf("Enter 1 for bubble 2 for selection and 3 for insertion 4 for merge 5 for quick: ");
    scanf("%d",&choice);
    switch (choice)
    {
    case 1:{
        /* code */
        bubble_sort(arr,n);
        break;}
    case 2:{
        selection_sort(arr,n);
        break;
    }
    case 3:{
        insertionSort(arr,n);
        break;
    }
    case 4:{
        mergeSort(arr,0,n-1);
        break;
    }
    case 5:{
        quicksort(arr,0,n-1);
        break;
    }
    
    default:
        printf("Invalid Choice.");
        break;
    }
    for(int i=0;i<n;i++){
        printf("%d ",arr[i]);
    }

    return 0;
}