import json
from getopt import getopt
from sys import argv

if __name__ == '__main__':

    options, remainder = getopt(argv[1:], "i:s:")

    input_file_path = str()
    searchStr = str()

    for opt, arg in options:
        if opt == "-i":
            input_file_path = arg
        elif opt == "-s":
            searchStr = arg

    if not input_file_path:
        print("\nUsage: python3 dps.py [-i input_file_path] [-s search_str]")
        print("\t-i path to input image file")
        print("\t-s keywords need to search")
    else:
        json_obj = json.load(open(input_file_path, encoding='utf-8'))
        ScriptMethod = json_obj['ScriptMethod']
        ScriptMetadataMethod = json_obj['ScriptMetadataMethod']

        temp_name = []
        temp_addr = []

        for temp in ScriptMethod:
            if searchStr in temp["Name"]:
                temp_name.append(temp["Name"])
                temp_addr.append(hex(temp["Address"]))

        print("\n----------------------------------------")
        print('Found : ' + str(len(temp_name)) + ' Functions (By search "'+searchStr+'")')
        print('----------------------------------------\n')
        print("var arrayAddr = ")
        print(temp_addr)
        print("\nvar arrayName = ")
        print(temp_name)
        print('\n----------------------------------------')
